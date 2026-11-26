"use client";

import { type FormEvent, useState } from "react";
import { inquiry } from "@/data/site-content";

type Fields = {
  name: string;
  email: string;
  message: string;
};

const empty: Fields = { name: "", email: "", message: "" };

export function Inquiry() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [notice, setNotice] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<Fields> = {};
    if (values.name.trim().length < 2) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Please add a valid email.";
    if (values.message.trim().length < 8) next.message = "Please share a few words about the wreath.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setNotice("");
      return;
    }
    setNotice(inquiry.note);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-ink text-ivory">
      <div className="mx-auto grid max-w-[1680px] gap-16 px-6 py-24 md:py-32 lg:grid-cols-12 lg:px-12 lg:py-40">
        <div className="lg:col-span-6">
          <p className="eyebrow">08 — {inquiry.eyebrow}</p>
          <h2 className="display mt-6 text-[clamp(3.2rem,6vw,6.4rem)]">
            {inquiry.title[0]}
            <span className="mt-2 block italic text-champagne">{inquiry.title[1]}</span>
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted md:text-lg">{inquiry.body}</p>
          <div aria-hidden="true" className="pointer-events-none mt-12 hidden w-[78%] lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/botanicals/ribbon.webp" alt="" className="w-full" />
          </div>
        </div>
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8">
          <Field
            id="inquiry-name"
            label="Name"
            value={values.name}
            error={errors.name}
            autoComplete="name"
            onChange={(value) => setValues((current) => ({ ...current, name: value }))}
          />
          <Field
            id="inquiry-email"
            label="Email"
            type="email"
            value={values.email}
            error={errors.email}
            autoComplete="email"
            onChange={(value) => setValues((current) => ({ ...current, email: value }))}
          />
          <div>
            <label htmlFor="inquiry-message" className="text-[0.68rem] tracking-[0.2em] text-gold uppercase">
              Message
            </label>
            <textarea
              id="inquiry-message"
              name="message"
              rows={5}
              value={values.message}
              onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "inquiry-message-error" : undefined}
              className="mt-3 w-full resize-y border-0 border-b border-gold/40 bg-transparent py-3 text-ivory outline-none"
            />
            {errors.message ? (
              <p id="inquiry-message-error" className="mt-2 text-sm text-champagne">
                {errors.message}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="inline-flex min-h-12 w-fit items-center border border-gold px-8 text-[0.72rem] tracking-[0.22em] uppercase transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            Write to the house
          </button>
          <p role="status" aria-live="polite" className="min-h-12 max-w-sm text-sm leading-relaxed text-champagne">
            {notice}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-[0.68rem] tracking-[0.2em] text-gold uppercase">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="mt-3 w-full border-0 border-b border-gold/40 bg-transparent py-3 text-ivory outline-none"
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-champagne">
          {error}
        </p>
      ) : null}
    </div>
  );
}
