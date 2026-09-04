import { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function PageShell({
  children,
  title,
  subtitle,
  className = "",
}: PageShellProps) {
  return (
    <div className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 ${className}`}>
      {(title || subtitle) && (
        <header className="mb-8 sm:mb-10">
          {title && (
            <h1 className="text-3xl font-bold tracking-tight text-pmr-dark sm:text-4xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-3 max-w-3xl text-lg text-pmr-charcoal">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  );
}
