import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

const controlClasses =
  "w-full rounded-[3px] border bg-white px-4 text-[0.9375rem] text-dark placeholder:text-dark/35 transition-colors duration-200 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent";

type FieldWrapperProps = {
  id: string;
  label: string;
  required?: boolean;
  optionalLabel?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

function FieldWrapper({ id, label, required, optionalLabel, error, className, children }: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.8125rem] font-semibold text-dark">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-accent">
            {" "}*
          </span>
        ) : null}
        {optionalLabel ? <span className="font-normal text-dark/50"> ({optionalLabel})</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[0.8125rem] text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  optionalLabel?: string;
  error?: string;
  wrapperClassName?: string;
};

/** Pole tekstowe z etykietą i komunikatem błędu (powiązanym przez aria-describedby). */
export function TextField({ id, label, optionalLabel, error, required, wrapperClassName, className, ...rest }: TextFieldProps) {
  return (
    <FieldWrapper id={id} label={label} required={required} optionalLabel={optionalLabel} error={error} className={wrapperClassName}>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClasses, "h-12", error ? "border-red-700" : "border-dark/20", className)}
        {...rest}
      />
    </FieldWrapper>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  optionalLabel?: string;
  error?: string;
  wrapperClassName?: string;
};

export function TextAreaField({ id, label, optionalLabel, error, required, wrapperClassName, className, ...rest }: TextAreaFieldProps) {
  return (
    <FieldWrapper id={id} label={label} required={required} optionalLabel={optionalLabel} error={error} className={wrapperClassName}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(controlClasses, "min-h-32 resize-y py-3", error ? "border-red-700" : "border-dark/20", className)}
        {...rest}
      />
    </FieldWrapper>
  );
}

type CheckboxFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  children: ReactNode;
  error?: string;
  wrapperClassName?: string;
};

/** Pole wyboru (np. zgoda) – treść etykiety przekazujesz jako children. */
export function CheckboxField({ id, children, error, required, wrapperClassName, ...rest }: CheckboxFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", wrapperClassName)}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-[2px] accent-accent"
          {...rest}
        />
        <label htmlFor={id} className="cursor-pointer text-[0.8125rem] leading-relaxed text-dark/75">
          {children}
          {required ? (
            <span aria-hidden="true" className="text-accent">
              {" "}*
            </span>
          ) : null}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="pl-8 text-[0.8125rem] text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
