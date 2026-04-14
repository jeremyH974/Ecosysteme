import type { InputHTMLAttributes } from "react";

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  name: string;
  helpText?: string;
  error?: string;
  suffix?: string;
}

export function FormField({ label, name, helpText, error, required, suffix, ...inputProps }: FormFieldProps) {
  const inputId = `field-${name}`;
  const helpId = helpText ? `${inputId}-help` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>

      {helpText && (
        <p id={helpId} className="text-xs text-muted">
          {helpText}
        </p>
      )}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          aria-describedby={[helpId, errorId].filter(Boolean).join(" ") || undefined}
          aria-invalid={error ? true : undefined}
          className={[
            "block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-colors",
            "placeholder:text-muted-light",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            suffix ? "pr-12" : "",
            error
              ? "border-danger focus:border-danger focus:ring-danger/20"
              : "border-border hover:border-border-hover focus:border-accent focus:ring-accent/20",
          ].join(" ")}
          {...inputProps}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted">
            {suffix}
          </span>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
