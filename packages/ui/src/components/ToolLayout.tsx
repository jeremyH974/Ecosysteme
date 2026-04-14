import type { ReactNode } from "react";

export interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function ToolLayout({ title, description, children, footer }: ToolLayoutProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-emerald-700">
          <span className="inline-block h-px w-6 bg-emerald-700" />
          Simulateur
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h1>
        <p className="mt-2 text-base text-gray-500">{description}</p>
      </header>

      <main>{children}</main>

      {footer && (
        <footer className="mt-16 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          {footer}
        </footer>
      )}
    </div>
  );
}
