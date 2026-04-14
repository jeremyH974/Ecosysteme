export interface TrustFooterSource {
  label: string;
  url: string;
}

export interface TrustFooterProps {
  baremeNom: string;
  dateBareme: string;
  sources: TrustFooterSource[];
  verifieLe: string;
  casCouverts: string;
  casNonCouverts: string;
}

export function TrustFooter({
  baremeNom,
  dateBareme,
  sources,
  verifieLe,
  casCouverts,
  casNonCouverts,
}: TrustFooterProps) {
  return (
    <div className="space-y-2.5 text-xs leading-relaxed text-muted">
      <p>
        <span className="font-medium text-foreground">Bareme :</span> {baremeNom} &middot; Applicable
        depuis {dateBareme}
      </p>

      {sources.map((source) => (
        <p key={source.url}>
          <span className="font-medium text-foreground">Source :</span> {source.label}{" "}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-primary/30 hover:decoration-primary"
          >
            consulter
          </a>
        </p>
      ))}

      <p>
        <span className="font-medium text-foreground">Verification :</span> {verifieLe}
      </p>

      <div className="mt-3 rounded-lg bg-surface p-3 text-xs">
        <p><span className="font-medium">Couvre :</span> {casCouverts}</p>
        <p className="mt-1"><span className="font-medium">Ne couvre pas :</span> {casNonCouverts}</p>
      </div>

      <p className="italic text-muted-light">
        Resultats a titre indicatif. Consultez un professionnel pour toute decision.
      </p>
    </div>
  );
}
