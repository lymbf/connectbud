"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";

import { sendQuoteRequest, type QuoteField, type QuoteFormState } from "@/app/actions/quote";
import { Button } from "@/components/UI/Button";
import { CheckboxField, TextAreaField, TextField } from "@/components/UI/form/FormField";
import { ArrowRightIcon, CheckIcon } from "@/components/UI/icons";
import type { QuoteFormContent } from "@/model/pages/home";

type QuoteFormProps = {
  content: QuoteFormContent;
  phone: { display: string; href: string };
};

const initialState: QuoteFormState = { status: "idle" };

/** Kolejność pól w formularzu – po błędzie fokus trafia na pierwsze niepoprawne */
const FIELD_ORDER: QuoteField[] = ["name", "phone", "email", "message", "consent"];
const fieldId = (field: QuoteField) => `quote-${field}`;

/** Formularz zapytania o wycenę. Po wysłaniu pokazuje potwierdzenie z możliwością wysłania kolejnego. */
export function QuoteForm(props: QuoteFormProps) {
  // zmiana klucza „resetuje” formularz po kliknięciu „Wyślij kolejne zapytanie”
  const [formKey, setFormKey] = useState(0);
  return (
    <QuoteFormBody
      key={formKey}
      {...props}
      focusFirstField={formKey > 0}
      onReset={() => setFormKey((key) => key + 1)}
    />
  );
}

type QuoteFormBodyProps = QuoteFormProps & {
  /** Po „Wyślij kolejne zapytanie” kursor od razu trafia do pierwszego pola */
  focusFirstField: boolean;
  onReset: () => void;
};

function QuoteFormBody({ content, phone, focusFirstField, onReset }: QuoteFormBodyProps) {
  const [state, formAction, pending] = useActionState(sendQuoteRequest, initialState);
  const { fields } = content;
  const errors = state.errors ?? {};
  const values = state.values ?? {};

  // po nieudanej walidacji przenosimy fokus na pierwsze pole z błędem
  useEffect(() => {
    if (state.status !== "error" || !state.errors) return;
    const firstInvalid = FIELD_ORDER.find((field) => state.errors?.[field]);
    if (firstInvalid) document.getElementById(fieldId(firstInvalid))?.focus();
  }, [state]);

  if (state.status === "success") {
    return <QuoteSuccess content={content} phone={phone} onReset={onReset} />;
  }

  return (
    <form action={formAction} noValidate className="focus-accent bg-white p-7 text-dark sm:p-10">
      <h3 className="font-heading text-2xl font-medium sm:text-[1.75rem]">{content.title}</h3>
      <p className="mt-2 text-sm text-dark/60">{content.subtitle}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <TextField
          id={fieldId("name")}
          name="name"
          label={fields.name.label}
          placeholder={fields.name.placeholder}
          autoComplete="name"
          autoFocus={focusFirstField}
          required
          defaultValue={values.name}
          error={errors.name}
        />
        <TextField
          id={fieldId("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          label={fields.phone.label}
          placeholder={fields.phone.placeholder}
          autoComplete="tel"
          required
          defaultValue={values.phone}
          error={errors.phone}
        />
        <TextField
          id={fieldId("email")}
          name="email"
          type="email"
          label={fields.email.label}
          optionalLabel={fields.email.optional}
          placeholder={fields.email.placeholder}
          autoComplete="email"
          defaultValue={values.email}
          error={errors.email}
          wrapperClassName="sm:col-span-2"
        />
        <TextAreaField
          id={fieldId("message")}
          name="message"
          label={fields.message.label}
          optionalLabel={fields.message.optional}
          placeholder={fields.message.placeholder}
          rows={4}
          defaultValue={values.message}
          error={errors.message}
          wrapperClassName="sm:col-span-2"
        />
      </div>

      {/* pole-pułapka na boty – ukryte dla ludzi */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="quote-company">Firma</label>
        <input id="quote-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <CheckboxField
        id={fieldId("consent")}
        name="consent"
        required
        defaultChecked={values.consent}
        error={errors.consent}
        wrapperClassName="mt-6"
      >
        {fields.consent.label}{" "}
        <Link href={fields.consent.policyHref} className="font-medium text-accent underline underline-offset-2 hover:text-accent-dark">
          {fields.consent.policyLabel}
        </Link>
        .
      </CheckboxField>

      {state.status === "error" && state.message ? (
        <p role="alert" className="mt-6 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Button type="submit" disabled={pending} aria-disabled={pending}>
          {pending ? content.pending : content.submit}
          {pending ? null : <ArrowRightIcon size={16} />}
        </Button>
        <p className="text-xs leading-relaxed text-dark/55">{content.note}</p>
      </div>
    </form>
  );
}

type QuoteSuccessProps = Pick<QuoteFormBodyProps, "content" | "phone" | "onReset">;

/** Potwierdzenie wysłania – zastępuje formularz w tym samym miejscu. */
function QuoteSuccess({ content, phone, onReset }: QuoteSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // formularz (razem z przyciskiem, na którym był fokus) znika – przenosimy fokus na potwierdzenie,
  // dzięki czemu przeglądarka przewinie do niego, a czytnik ekranu je odczyta
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="focus-accent flex min-h-[28rem] flex-col justify-center bg-white p-7 text-dark sm:p-10">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent text-white">
        <CheckIcon size={28} strokeWidth={2} />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-7 font-heading text-2xl font-medium outline-none sm:text-[1.75rem]">
        {content.success.title}
      </h3>
      <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-dark/70">
        {content.success.text}{" "}
        <a href={phone.href} className="font-semibold whitespace-nowrap text-accent hover:text-accent-dark">
          {phone.display}
        </a>
      </p>
      <Button variant="outline-dark" className="mt-8 self-start" onClick={onReset}>
        {content.success.again}
      </Button>
    </div>
  );
}
