"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function RsvpForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [nameError, setNameError] = useState(false);
  const [choiceError, setChoiceError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [submittedAttendance, setSubmittedAttendance] = useState(true);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    setNameError(!trimmedName);
    setChoiceError(attending === null);
    if (!trimmedName || attending === null) return;

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

  if (status === "done") {
    return <div className="rsvp-form rsvp-success" role="status" aria-live="polite"><span className="success-symbol" aria-hidden="true">{submittedAttendance ? "✦" : "♡"}</span><span className="eyebrow">Response received</span><h3>{submittedAttendance ? "We can’t wait to celebrate!" : "You’ll be in our hearts"}</h3><p>Thank you, {name.split(" ")[0]}. {submittedAttendance ? "Your seat is saved, and we’re so happy you’ll be joining us." : "Thank you for letting us know. We’ll miss celebrating with you."}</p></div>;
  }

  return (
    <form onSubmit={submit} className="rsvp-form" noValidate>
      <span className="eyebrow">Your reply</span>
      <h3>Kindly respond</h3>
      <div className="form-field"><label htmlFor="rsvp-name">Your full name <span>*</span></label><input id="rsvp-name" required autoComplete="name" maxLength={120} value={name} aria-invalid={nameError} aria-describedby={nameError ? "rsvp-name-error" : undefined} onChange={(event) => { setName(event.target.value); if (event.target.value.trim()) setNameError(false); if (status === "error") setStatus("idle"); }} placeholder="As it appears on your invitation" />{nameError && <p id="rsvp-name-error" className="field-error" role="alert">Please enter your full name.</p>}</div>
      <fieldset className="form-field"><legend>Will you be attending? <span>*</span></legend><div className="attendance-choices"><label className={attending === true ? "selected" : ""}><input type="radio" name="attending" value="yes" checked={attending === true} onChange={() => { setAttending(true); setChoiceError(false); if (status === "error") setStatus("idle"); }} /><span className="choice-icon" aria-hidden="true">♡</span><span><strong>Joyfully accepts</strong><small>I’ll be there</small></span></label><label className={attending === false ? "selected" : ""}><input type="radio" name="attending" value="no" checked={attending === false} onChange={() => { setAttending(false); setChoiceError(false); if (status === "error") setStatus("idle"); }} /><span className="choice-icon" aria-hidden="true">✦</span><span><strong>Regretfully declines</strong><small>Unable to attend</small></span></label></div>{choiceError && <p className="field-error" role="alert">Please select whether you’ll be attending.</p>}</fieldset>
      <div className="form-field"><div className="form-label-row"><label htmlFor="rsvp-message">A note for the couple <span className="optional">(optional)</span></label><small>{message.length}/1000</small></div><textarea id="rsvp-message" rows={4} maxLength={1000} value={message} onChange={(event) => { setMessage(event.target.value); if (status === "error") setStatus("idle"); }} placeholder="Leave a wish, a memory, or a little note..." /></div>
      {status === "error" && <p className="form-error" role="alert">We couldn’t send your response. Please check your connection and try again.</p>}
      <button type="submit" disabled={status === "sending"} className="form-submit">{status === "sending" ? "Sending your response…" : "Send my response"}<span aria-hidden="true">↗</span></button>
      <p className="form-footnote">Fields marked * are required</p>
    </form>
  );
}
