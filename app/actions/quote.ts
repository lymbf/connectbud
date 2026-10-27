"use server";

import { quoteValidation } from "@/model/pages/home";

export type QuoteField = "name" | "phone" | "email" | "message" | "consent";

export type QuoteFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<QuoteField, string>>;
  /** Wpisane dane – wracają do formularza, gdy walidacja się nie powiedzie */
  values?: Partial<Record<Exclude<QuoteField, "consent">, string>> & { consent?: boolean };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Obsługa formularza „Zapytaj o wycenę” (Server Action – wykonuje się na serwerze).
 *
 * TODO: wysyłka wiadomości. Formularz waliduje dane, ale jeszcze ich nigdzie nie wysyła.
 * Miejsce na integrację jest oznaczone niżej (np. e-mail przez Resend/SMTP albo zapis do CRM).
 */
export async function sendQuoteRequest(_previous: QuoteFormState, formData: FormData): Promise<QuoteFormState> {
  // pole-pułapka na boty – niewidoczne dla ludzi, więc u nich zawsze puste
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };
  const consent = formData.get("consent") === "on";

  const errors: QuoteFormState["errors"] = {};

  if (!values.name) errors.name = quoteValidation.name;

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!values.phone) errors.phone = quoteValidation.phone;
  else if (phoneDigits.length < 9) errors.phone = quoteValidation.phoneInvalid;

  if (values.email && !EMAIL_PATTERN.test(values.email)) errors.email = quoteValidation.emailInvalid;

  if (!consent) errors.consent = quoteValidation.consent;

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: quoteValidation.summary, errors, values: { ...values, consent } };
  }

  // TODO: tu wyślij zapytanie do firmy (e-mail / CRM). Do czasu integracji trafia tylko do logów serwera.
  console.info("[Zapytanie o wycenę]", { ...values, sentAt: new Date().toISOString() });

  return { status: "success" };
}
