export interface CrossPromoProps {
  toolName: string;
  toolUrl: string;
  description: string;
}

export function CrossPromo({ toolName, toolUrl, description }: CrossPromoProps) {
  return (
    <div className="rounded-md border border-gray-100 bg-gray-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        Vous pourriez aussi avoir besoin de...
      </p>
      <a
        href={toolUrl}
        className="mt-1 block text-sm font-medium text-emerald-700 hover:text-emerald-800"
      >
        {toolName}
      </a>
      <p className="mt-0.5 text-xs text-gray-500">{description}</p>
    </div>
  );
}
