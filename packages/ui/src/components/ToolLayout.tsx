import type { ReactNode } from "react";

export interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function ToolLayout({ title, description, children, footer }: ToolLayoutProps) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:py-12">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h1>
        <p className="mt-1.5 text-sm text-muted">{description}</p>
      </header>

      <main>{children}</main>

      {footer && (
        <footer className="mt-12 rounded-xl border border-border bg-surface-card p-5 sm:p-6">
          {footer}
        </footer>
      )}
    </div>
  );
}
