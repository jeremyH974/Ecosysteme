import { NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 2; // Liste "alertes-IRL" a creer dans Brevo

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email: string };

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // Si pas de cle Brevo configuree, on log et on retourne OK (dev mode)
    if (!BREVO_API_KEY) {
      console.log(`[IRL-ALERT] Inscription sans Brevo: ${email} — ${new Date().toISOString()}`);
      return NextResponse.json({ ok: true, mode: "dev" });
    }

    // Creer/mettre a jour le contact dans Brevo + ajouter a la liste
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        attributes: {
          SOURCE: "ecosysteme-irl-alert",
          DATE_INSCRIPTION: new Date().toISOString(),
        },
        updateEnabled: true,
      }),
    });

    if (!response.ok && response.status !== 204) {
      const body = await response.text();
      console.error(`[IRL-ALERT] Brevo error: ${response.status} ${body}`);
      // Si le contact existe deja (409), on considere comme OK
      if (response.status === 409) {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
