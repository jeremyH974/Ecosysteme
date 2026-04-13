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
    <div className="space-y-2 text-xs leading-relaxed text-gray-500">
      <p>
        <span className="font-medium">Bareme utilise :</span> {baremeNom} &middot; Applicable
        depuis {dateBareme}
      </p>

      {sources.map((source) => (
        <p key={source.url}>
          <span className="font-medium">Source :</span> {source.label}{" "}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 underline hover:text-emerald-800"
          >
            Voir la source
          </a>
        </p>
      ))}

      <p>
        <span className="font-medium">Derniere verification :</span> {verifieLe}
      </p>

      <p>
        Ce simulateur couvre : {casCouverts}. Il ne couvre pas : {casNonCouverts}.
      </p>

      <p className="italic">
        Les resultats sont fournis a titre indicatif. Consultez un professionnel pour toute
        decision.
      </p>
    </div>
  );
}
