"use client";

import { useState } from "react";

const VARIANTS = {
  1: {
    card: "rounded-[2rem] border border-dusty-200 bg-white/90 p-6 shadow-[0_22px_60px_rgba(54,75,93,0.12)] sm:p-9",
    input: "rounded-xl border border-dusty-200 bg-dusty-50/50 px-4",
    choice: "rounded-2xl",
    selected: "shadow-md",
    button: "rounded-full bg-dusty-700 hover:bg-dusty-800",
  },
  2: {
    card: "border-y border-dusty-200 bg-transparent py-8",
    input: "border-0 border-b border-dusty-300 bg-transparent px-0",
    choice: "rounded-none border-x-0 border-t-0",
    selected: "",
    button: "rounded-none bg-dusty-800 uppercase tracking-[0.25em] hover:bg-dusty-900",
  },
  3: {
    card: "rounded-lg border border-dusty-300 bg-dusty-100/80 p-6 shadow-[0_18px_50px_rgba(54,75,93,0.08)] sm:p-9",
    input: "rounded-md border border-dusty-300 bg-white px-4",
    choice: "rounded-md",
    selected: "shadow-md",
    button: "rounded-md bg-dusty-600 hover:bg-dusty-700",
  },
} as const;

type Status = "idle" | "sending" | "done" | "error";

export default function RsvpForm({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const styles = VARIANTS[variant];
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [showNameError, setShowNameError] = useState(false);
  const [showChoiceError, setShowChoiceError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [submittedAttendance, setSubmittedAttendance] = useState(true);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const nameMissing = !trimmedName;
    const choiceMissing = attending === null;
    setShowNameError(nameMissing);
    setShowChoiceError(choiceMissing);
    if (nameMissing || choiceMissing || attending === null) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, message: message.trim(), attending }),
      });

      if (!response.ok) throw new Error("Unable to save RSVP");
      setName(trimmedName);
      setSubmittedAttendance(attending);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  function chooseAttendance(value: boolean) {
    setAttending(value);
    setShowChoiceError(false);
    if (status === "error") setStatus("idle");
  }

  if (status === "done") {
    return (
      <div className={`${styles.card} text-center`} role="status" aria-live="polite">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-dusty-300 bg-dusty-100 text-2xl text-dusty-700" aria-hidden>
          {submittedAttendance ? "✓" : "♡"}
        </div>
        <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-dusty-500">Response received</p>
        <h3 className="mt-3 font-serif text-4xl font-light italic text-dusty-800">
          {submittedAttendance ? "We can’t wait to celebrate!" : "You’ll be in our hearts"}
        </h3>
        <div className="mx-auto my-5 h-px w-16 bg-dusty-300" aria-hidden />
        <p className="mx-auto max-w-sm text-sm leading-7 text-dusty-700">
          Thank you, {name.split(" ")[0]}. {submittedAttendance
            ? "Your seat is saved, and we’re so happy you’ll be joining us."
            : "Thank you for letting us know. We’ll miss celebrating with you."}
        </p>
      </div>
    );
  }

  const fieldClass = `mt-2 w-full py-3.5 text-sm text-dusty-900 outline-none transition placeholder:text-dusty-400 focus:border-dusty-500 focus:ring-4 focus:ring-dusty-200/70 ${styles.input}`;

  return (
    <form onSubmit={submit} className={`${styles.card} space-y-7 text-left`} noValidate>
      <div>
        <label htmlFor={`rsvp-name-${variant}`} className="text-[10px] uppercase tracking-[0.3em] text-dusty-600">
          Full name <span className="text-dusty-400">*</span>
        </label>
        <input
          id={`rsvp-name-${variant}`}
          required
          autoComplete="name"
          maxLength={120}
          value={name}
          aria-invalid={showNameError}
          aria-describedby={showNameError ? `name-error-${variant}` : undefined}
          onChange={(event) => {
            setName(event.target.value);
            if (event.target.value.trim()) setShowNameError(false);
            if (status === "error") setStatus("idle");
          }}
          className={`${fieldClass} ${showNameError ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}`}
          placeholder="Enter your full name"
        />
        {showNameError && (
          <p id={`name-error-${variant}`} className="mt-2 text-xs text-red-700" role="alert">
            Please enter your full name.
          </p>
        )}
      </div>

      <fieldset aria-describedby={showChoiceError ? `attendance-error-${variant}` : undefined}>
        <legend className="text-[10px] uppercase tracking-[0.3em] text-dusty-600">
          Will you be attending? <span className="text-dusty-400">*</span>
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2" role="radiogroup">
          {[
            { value: true, title: "Joyfully accepts", detail: "I’ll be there", symbol: "♥", selectedColor: "border-emerald-600 bg-emerald-600", iconColor: "text-red-600" },
            { value: false, title: "Regretfully declines", detail: "Unable to attend", symbol: "💔", selectedColor: "border-red-600 bg-red-600" },
          ].map((option) => {
            const selected = attending === option.value;
            return (
              <button
                key={option.title}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => chooseAttendance(option.value)}
                className={`flex min-h-20 items-center gap-3 border px-4 py-4 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300 ${styles.choice} ${selected ? `${styles.selected} ${option.selectedColor} text-white` : "border-dusty-200 bg-white/80 text-dusty-800 hover:border-dusty-400 hover:bg-white"}`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm ${selected ? "border-white/50 bg-white/15" : "border-dusty-300 bg-dusty-50 text-dusty-600"} ${option.iconColor ?? ""}`} aria-hidden>
                  {option.symbol}
                </span>
                <span>
                  <span className="block font-serif text-lg leading-tight">{option.title}</span>
                  <span className={`mt-1 block text-[10px] uppercase tracking-[0.2em] ${selected ? "text-white/70" : "text-dusty-500"}`}>{option.detail}</span>
                </span>
              </button>
            );
          })}
        </div>
        {showChoiceError && (
          <p id={`attendance-error-${variant}`} className="mt-2 text-xs text-red-700" role="alert">
            Please select whether you’ll be attending.
          </p>
        )}
      </fieldset>

      <div>
        <div className="flex items-end justify-between gap-4">
          <label htmlFor={`rsvp-message-${variant}`} className="text-[10px] uppercase tracking-[0.3em] text-dusty-600">
            Message for the couple
          </label>
          <span className="text-[10px] tabular-nums text-dusty-400">{message.length}/1000</span>
        </div>
        <textarea
          id={`rsvp-message-${variant}`}
          rows={4}
          maxLength={1000}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          className={`${fieldClass} resize-y`}
          placeholder="Share a wish or a little note (optional)"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={`flex w-full items-center justify-center gap-3 py-4 text-xs font-medium text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300 disabled:cursor-wait disabled:translate-y-0 disabled:opacity-65 ${styles.button}`}
      >
        {status === "sending" && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />}
        {status === "sending" ? "Sending your response…" : "Send RSVP"}
      </button>

      <div aria-live="polite">
        {status === "error" && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-xs leading-5 text-red-700" role="alert">
            We couldn’t send your response. Please check your connection and try again.
          </p>
        )}
      </div>
      <p className="text-center text-[10px] uppercase tracking-[0.22em] text-dusty-400">
        Fields marked * are required
      </p>
    </form>
  );
}
