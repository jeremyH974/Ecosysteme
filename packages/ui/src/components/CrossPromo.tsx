export interface CrossPromoProps {
  toolName: string;
  toolUrl: string;
  description: string;
}

export function CrossPromo({ toolName, toolUrl, description }: CrossPromoProps) {
  return (
    <a
      href={toolUrl}
      className="group block rounded-lg border border-border bg-surface-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-light">
        Outil recommande
      </p>
      <p className="mt-1 text-sm font-medium text-foreground group-hover:text-primary">
        {toolName}
      </p>
      <p className="mt-0.5 text-xs text-muted">{description}</p>
    </a>
  );
}
