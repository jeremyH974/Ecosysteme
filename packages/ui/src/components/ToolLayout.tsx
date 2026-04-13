import type { ReactNode } from "react";

export interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function ToolLayout({ title, description, children, footer }: ToolLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
        <p className="mt-2 text-lg text-gray-600">{description}</p>
      </header>

      <main>{children}</main>

      {footer && <footer className="mt-12 border-t border-gray-200 pt-6">{footer}</footer>}
    </div>
  );
}
