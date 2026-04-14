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
      <div className="flex items-start gap-2">
        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
        <div>
          <p><span className="font-medium text-foreground">Bareme :</span> {baremeNom} &middot; Applicable depuis {dateBareme}</p>
        </div>
      </div>

      {sources.map((source) => (
        <p key={source.url} className="pl-5.5">
          <span className="font-medium text-foreground">Source :</span> {source.label}{" "}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/30 hover:decoration-accent"
          >
            consulter
          </a>
        </p>
      ))}

      <p className="pl-5.5">
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
