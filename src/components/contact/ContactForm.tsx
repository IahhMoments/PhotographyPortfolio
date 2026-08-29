'use client';

import { useState, type FormEvent } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const PHOTOGRAPHY_TYPES = ['Portrait', 'Family', 'Event', 'Other'] as const;
const BUDGET_RANGES = ['Under $250', '$250–$500', '$500–$1,000', '$1,000+', 'Not sure yet'] as const;

// Set NEXT_PUBLIC_FORMSPREE_FORM_ID in .env.local (see .env.example). This is
// an endpoint ID, not a secret — see README.md → "Security notes".
const RAW_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
const IS_CONFIGURED = Boolean(RAW_FORM_ID) && RAW_FORM_ID !== 'your_formspree_form_id_here';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  photographyType: string;
  preferredDate: string;
  budget: string;
  message: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  photographyType: '',
  preferredDate: '',
  budget: '',
  message: '',
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  // useForm always needs a formId; when unconfigured we pass a harmless
  // placeholder and simply never call formspreeSubmit (see handleSubmit).
  const [formspree, formspreeSubmit] = useForm(IS_CONFIGURED ? (RAW_FORM_ID as string) : 'unconfigured');

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [notConfiguredMessage, setNotConfiguredMessage] = useState('');

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!isValidEmail(values.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!values.photographyType) next.photographyType = 'Please choose a session type.';
    if (!values.message.trim()) next.message = 'Please add a short message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Run our own inline validation first — Formspree's own error state
    // (formspree.errors) is reserved for things only their server can tell
    // us (spam holds, rate limits, plan limits), not basic required fields.
    if (!validate()) {
      event.preventDefault();
      return;
    }

    if (!IS_CONFIGURED) {
      event.preventDefault();
      setNotConfiguredMessage(
        'This form is not connected yet. Add your Formspree form ID to NEXT_PUBLIC_FORMSPREE_FORM_ID and rebuild the site — see .env.example.',
      );
      return;
    }

    setNotConfiguredMessage('');
    // Hand off to @formspree/react, which calls event.preventDefault() itself,
    // reads the form's fields (including the "_gotcha" honeypot below) via
    // FormData, and posts to your Formspree endpoint.
    formspreeSubmit(event);
  }

  if (formspree.succeeded) {
    return (
      <div role="status" className="rounded-sm border border-line bg-paper-soft p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-accent">Inquiry received</p>
        <p className="mt-4 text-2xl">Thank you! Your inquiry has been received.</p>
        <p className="mt-2 text-ink-soft">I&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Formspree's honeypot convention: a hidden "_gotcha" field. Real
          visitors never fill this in; bots that autofill every field will,
          and Formspree silently discards the submission on their end. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_gotcha">Leave this field empty</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClasses(Boolean(errors.name))}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClasses(Boolean(errors.email))}
          />
          <ValidationError prefix="Email" field="email" errors={formspree.errors} className="mt-1.5 text-xs text-ink" />
        </Field>

        <Field label="Phone number" htmlFor="phone" optional>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={inputClasses(false)}
          />
        </Field>

        <Field label="Type of photography" htmlFor="photographyType" error={errors.photographyType} required>
          <select
            id="photographyType"
            name="photographyType"
            value={values.photographyType}
            onChange={(e) => update('photographyType', e.target.value)}
            aria-invalid={Boolean(errors.photographyType)}
            aria-describedby={errors.photographyType ? 'photographyType-error' : undefined}
            className={inputClasses(Boolean(errors.photographyType))}
          >
            <option value="" disabled>
              Select a session type
            </option>
            {PHOTOGRAPHY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Preferred date" htmlFor="preferredDate" optional>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={values.preferredDate}
            onChange={(e) => update('preferredDate', e.target.value)}
            className={inputClasses(false)}
          />
        </Field>

        <Field label="Budget" htmlFor="budget" optional>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(e) => update('budget', e.target.value)}
            className={inputClasses(false)}
          >
            <option value="">Prefer not to say</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" htmlFor="message" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="Tell me a bit about what you're looking for..."
          className={inputClasses(Boolean(errors.message))}
        />
        <ValidationError prefix="Message" field="message" errors={formspree.errors} className="mt-1.5 text-xs text-ink" />
      </Field>

      {notConfiguredMessage ? (
        <p role="alert" className="rounded-sm border border-ink/20 bg-paper-soft p-4 text-sm text-ink">
          {notConfiguredMessage}
        </p>
      ) : null}

      {/* Form-level errors from Formspree itself (rate limits, form paused, etc). */}
      <ValidationError errors={formspree.errors} className="rounded-sm border border-ink/20 bg-paper-soft p-4 text-sm text-ink" />

      <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={formspree.submitting}>
        {formspree.submitting ? 'Sending…' : 'Send Inquiry'}
      </Button>
    </form>
  );
}

function inputClasses(hasError: boolean) {
  return cn(
    'w-full rounded-sm border bg-paper px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors duration-200 focus:outline-none',
    hasError ? 'border-ink' : 'border-line focus:border-ink',
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm text-ink">
        {label}
        {required ? <span aria-hidden="true" className="text-accent"> *</span> : null}
        {optional ? <span className="text-ink-soft"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-xs text-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}
