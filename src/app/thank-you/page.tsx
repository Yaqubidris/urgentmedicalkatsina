"use client";

import { useState } from "react";
import Link from "next/link";

const THANK_YOU_EMAIL_TEMPLATE =
  "I just supported this urgent medical fundraiser for a family in Katsina. If you can, please consider donating or forwarding. No amount is too small.";

const CONTACT_EMAIL = "hafsatbako@gmail.com";
const CONTACT_PHONE = "070123456789";

export default function ThankYouPage() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);

  async function handleCopyCampaignLink() {
    try {
      const homepageUrl = `${window.location.origin}/`;
      await navigator.clipboard.writeText(homepageUrl);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 1500);
    } catch {
      setLinkCopied(false);
    }
  }

  async function handleCopyForwardMessage() {
    try {
      await navigator.clipboard.writeText(THANK_YOU_EMAIL_TEMPLATE);
      setMessageCopied(true);
      window.setTimeout(() => setMessageCopied(false), 1500);
    } catch {
      setMessageCopied(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-sky-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.35)] sm:p-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Thank You for Your Support</h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Your donation brings us closer to urgent heart surgery and cancer treatment at Crystal Hospital, Katsina.
          </p>
          <p className="mt-3 text-sm font-medium text-slate-700">No amount is too small &mdash; your kindness truly matters.</p>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Transparency</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Updates will continue to be posted on the fundraiser page. Medical documents remain available for transparency.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Share by Email</h2>
          <p className="mt-2 text-sm text-slate-600">Help more people discover this urgent campaign.</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleCopyCampaignLink}
              className="min-h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {linkCopied ? "Copied!" : "Copy Campaign Link"}
            </button>
            <button
              type="button"
              onClick={handleCopyForwardMessage}
              className="min-h-11 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {messageCopied ? "Copied!" : "Copy Short Forward Message"}
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.4)] sm:p-8">
          <Link
            href="/"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 sm:w-auto"
          >
            Return to Fundraiser Page
          </Link>

          <p className="mt-5 text-sm text-slate-700">
            Questions? Contact: <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline decoration-slate-300 underline-offset-4">{CONTACT_EMAIL}</a>{" "}
            | <a href={`tel:${CONTACT_PHONE}`} className="font-semibold underline decoration-slate-300 underline-offset-4">{CONTACT_PHONE}</a>
          </p>
        </section>
      </main>
    </div>
  );
}
