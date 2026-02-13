"use client";

import { useEffect, useMemo, useState } from "react";

const GOAL_USD = 10000;
const GOAL_NGN = 13000000;
const RAISED_USD = 2850;
const RAISED_NGN = 3705000;
const LAUNCH_DATE_ISO = "2026-02-12";
const TIMELINE_DAYS = 90;
const LAST_UPDATED = "Updated: [edit me]";
const PAYSTACK_USD_URL = "https://paystack.shop/pay/fu5ypkq8yb";
const PAYSTACK_NGN_URL = "https://paystack.shop/pay/-v5l2no48v";
const USDT_TRC20 = "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
const CONTACT_EMAIL = "hafsatbako@gmail.com";
const CONTACT_PHONE = "070123456789";
const EMAIL_BLURB_TEMPLATE =
  "Hello,\nAn urgent fundraiser is open for life-saving care at Crystal Hospital, Katsina.\nIf you can help, please donate or forward this message.\nCampaign link: {{PAGE_LINK}}";

const DOCUMENTS = [
  {
    title: "Medical Summary",
    description: "Clinical summary of coronary artery and cancer care requirements.",
    href: "/docs/medical-summary.pdf",
  },
  {
    title: "Hospital Estimate",
    description: "Cost estimate and treatment pathway from Crystal Hospital, Katsina.",
    href: "/docs/hospital-estimate.pdf",
  },
] as const;

const FUNDING_BREAKDOWN = [
  { label: "Coronary Artery Procedure & Theatre", amount: 5200000 },
  { label: "Cancer Diagnostics & Chemotherapy", amount: 4300000 },
  { label: "Hospital Admission, Monitoring & Drugs", amount: 2100000 },
  { label: "Emergency Transport & Recovery Support", amount: 1400000 },
] as const;

const UPDATES = [
  {
    date: "Feb 12, 2026",
    title: "Campaign launched",
    detail: "Fundraiser opened to cover urgent cardiac surgery and immediate cancer care.",
  },
  {
    date: "Feb 15, 2026",
    title: "Initial records uploaded",
    detail: "Medical summary and estimate were added with sensitive IDs blurred for privacy.",
  },
  {
    date: "Feb 20, 2026",
    title: "Hospital review completed",
    detail: "Crystal Hospital confirmed timeline urgency and staged treatment plan.",
  },
] as const;

const CAMPAIGN_NAME = "urgntmedicalkatsina";

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNGN(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function parseDateOnlyUTC(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function getTargetDate(launchDateISO: string, timelineDays: number) {
  const launchDate = parseDateOnlyUTC(launchDateISO);
  const target = new Date(launchDate);
  target.setUTCDate(target.getUTCDate() + timelineDays);
  return target;
}

function getDaysRemaining(targetDate: Date) {
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return Math.ceil((targetDate.getTime() - todayUTC.getTime()) / (1000 * 60 * 60 * 24));
}

export default function Home() {
  const targetDate = useMemo(() => getTargetDate(LAUNCH_DATE_ISO, TIMELINE_DAYS), []);
  const [daysRemaining, setDaysRemaining] = useState(() => getDaysRemaining(targetDate));
  const [walletCopied, setWalletCopied] = useState(false);
  const [pageLinkCopied, setPageLinkCopied] = useState(false);
  const [blurbCopied, setBlurbCopied] = useState(false);

  const progressPercent = Math.min((RAISED_USD / GOAL_USD) * 100, 100);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDaysRemaining(getDaysRemaining(targetDate));
    }, 60_000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  async function handleCopyWallet() {
    try {
      await navigator.clipboard.writeText(USDT_TRC20);
      setWalletCopied(true);
      window.setTimeout(() => setWalletCopied(false), 1500);
    } catch {
      setWalletCopied(false);
    }
  }

  async function handleCopyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setPageLinkCopied(true);
      window.setTimeout(() => setPageLinkCopied(false), 1500);
    } catch {
      setPageLinkCopied(false);
    }
  }

  async function handleCopyBlurb() {
    try {
      const message = EMAIL_BLURB_TEMPLATE.replace("{{PAGE_LINK}}", window.location.href);
      await navigator.clipboard.writeText(message);
      setBlurbCopied(true);
      window.setTimeout(() => setBlurbCopied(false), 1500);
    } catch {
      setBlurbCopied(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-sky-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold tracking-tight sm:text-base">Urgent Medical Support</p>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#donate"
              className="min-h-11 rounded-2xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-700 sm:text-sm"
            >
              Donate Now
            </a>
            <a
              href="#documents"
              className="min-h-11 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 sm:text-sm"
            >
              View Documents
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-7 sm:gap-8 sm:px-6 lg:gap-10 lg:px-8 lg:py-12">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.35)] sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,63,94,0.08),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.08),_transparent_45%)]"
            aria-hidden="true"
          />
          <div className="relative grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <p className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">
                {CAMPAIGN_NAME}
              </p>
              <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Urgent Coronary Artery Disease surgery and ongoing cancer care for a family in Katsina.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
                We are raising emergency funds to support life-saving treatment at Crystal Hospital, Katsina, Nigeria.
                Time-sensitive procedures and oncology care are already in motion, and every contribution helps protect
                a life and stabilize recovery.
              </p>
              <p className="mt-3 text-sm font-medium text-slate-700">No amount is too small &mdash; every donation helps.</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                For privacy, personal details are limited. Medical documents and verification contacts are provided.
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/85 px-3 py-2 text-xs font-medium text-slate-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Z" />
                    <path d="M9 11.5 11 13l4-4" />
                  </svg>
                  Crystal Hospital, Katsina
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/85 px-3 py-2 text-xs font-medium text-slate-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                    <path d="M14 3v6h6" />
                  </svg>
                  Documents available (IDs blurred)
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/85 px-3 py-2 text-xs font-medium text-slate-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h18M7 15h2m3 0h5" />
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                  </svg>
                  Paystack + USDT TRC20
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#donate"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 sm:w-auto"
                >
                  Donate Now
                </a>
                <a
                  href="#documents"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                >
                  View Documents
                </a>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <article className="h-full rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 p-5">
                  <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/70 px-4 text-center text-sm text-slate-600">
                    Privacy respected - documents provided for verification.
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Progress</p>
                    <p className="text-sm font-medium text-slate-600">{progressPercent.toFixed(1)}% funded</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-right">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Target timeline</p>
                    <p className="mt-1 text-xs font-semibold text-slate-900 sm:text-sm">
                      {daysRemaining > 0 ? `Target timeline: ${daysRemaining} days remaining` : "Target timeline reached"}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Target date:{" "}
                      {targetDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        timeZone: "UTC",
                      })}
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-400"
                    style={{ width: `${progressPercent}%` }}
                    aria-label="Funding progress"
                  />
                </div>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-slate-500">Raised / Goal (USD)</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {formatUSD(RAISED_USD)} / {formatUSD(GOAL_USD)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-slate-500">Raised / Goal (NGN)</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {formatNGN(RAISED_NGN)} / {formatNGN(GOAL_NGN)}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-500">{LAST_UPDATED}</p>
              </article>
            </aside>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Our story</h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            This campaign supports a family facing severe coronary artery disease complications alongside active cancer
            treatment. To protect dignity and safety, we are maintaining partial privacy and withholding patient-identifying
            details publicly. Care is being provided at Crystal Hospital, Katsina, and funds go directly toward treatment,
            medicines, and required hospital support.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Funding breakdown</h2>
          <p className="mt-2 text-sm text-slate-500">Total planned budget: {formatNGN(GOAL_NGN)}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {FUNDING_BREAKDOWN.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md"
              >
                <p className="text-sm text-slate-600">{item.label}</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{formatNGN(item.amount)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">How funds will be used</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
            <li>Immediate coronary artery intervention and monitored inpatient care.</li>
            <li>Cancer diagnostics, medication cycles, and essential follow-up reviews.</li>
            <li>Critical drugs, recovery support, and emergency transport needs.</li>
          </ul>
          <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Transparency:</span> Updates will be posted on this page;
            receipts shared with sensitive details blurred.
          </p>
        </section>

        <section
          id="documents"
          className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.4)] sm:p-8"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Documents</h2>
          <p className="mt-2 text-sm font-medium text-slate-600">Sensitive IDs are blurred for privacy.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {DOCUMENTS.map((doc) => (
              <article
                key={doc.href}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex rounded-xl bg-white p-2 text-slate-700 shadow-sm" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                      <path d="M14 3v6h6" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{doc.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{doc.description}</p>
                  </div>
                </div>
                <a
                  href={doc.href}
                  className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Open PDF
                </a>
              </article>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            If the document doesn&apos;t open, please check back - upload in progress.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            <p className="font-semibold">Verification available</p>
            <p className="mt-1">
              Receiving care at Crystal Hospital, Katsina. Additional verification can be provided upon request.
            </p>
          </div>
        </section>

        <section
          id="donate"
          className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.4)] sm:p-8"
        >
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Donate</h2>
          <p className="mt-2 text-base text-slate-600">Choose Paystack or USDT TRC20. Every share and contribution matters.</p>
          <p className="mt-3 text-sm text-slate-700">Even $5 or &#8358;1,000 makes a difference. Thank you for your support.</p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <article className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Primary payment option</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <a
                    href={PAYSTACK_USD_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    Donate in USD (International)
                  </a>
                  <p className="mt-1 text-xs text-emerald-900">For international donors (card).</p>
                </div>
                <div>
                  <a
                    href={PAYSTACK_NGN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-12 w-full items-center justify-center rounded-2xl border border-emerald-300 bg-white px-4 py-3 text-center text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100"
                  >
                    Donate in NGN (Nigeria)
                  </a>
                  <p className="mt-1 text-xs text-emerald-900">For donors in Nigeria (card/bank).</p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">USDT (TRC20)</p>
              <p className="mt-3 break-all rounded-2xl bg-white p-3 font-mono text-sm text-slate-700">{USDT_TRC20}</p>
              <p className="mt-3 text-xs text-amber-700">Send only USDT on TRC20. Other networks may be lost.</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyWallet}
                  className="min-h-11 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  {walletCopied ? "Copied!" : "Copy Address"}
                </button>
              </div>
            </article>
          </div>

          <p className="mt-4 text-sm text-slate-700">
            Prefer to donate another way?{" "}
            <a className="font-semibold underline decoration-slate-300 underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{" "}
            |{" "}
            <a className="font-semibold underline decoration-slate-300 underline-offset-4" href={`tel:${CONTACT_PHONE}`}>
              {CONTACT_PHONE}
            </a>
          </p>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Forward by email</p>
            <p className="mt-1 text-sm text-slate-600">Help this campaign reach more people through direct email sharing.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopyPageLink}
                className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {pageLinkCopied ? "Copied!" : "Copy page link"}
              </button>
              <button
                type="button"
                onClick={handleCopyBlurb}
                className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {blurbCopied ? "Copied!" : "Copy short message"}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_35px_-22px_rgba(15,23,42,0.4)] sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Updates</h2>
          <ul className="mt-5 space-y-4">
            {UPDATES.map((update) => (
              <li
                key={`${update.date}-${update.title}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{update.date}</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{update.title}</p>
                <p className="mt-1 text-sm text-slate-600">{update.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
          <p className="text-sm leading-6 text-slate-700">
            This fundraiser is organized by a close family friend on behalf of a family in Katsina, Nigeria, using partial
            privacy protections while receiving care at Crystal Hospital.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-semibold text-slate-900">
            <span>Contact:</span>
            <a className="underline decoration-slate-300 underline-offset-4 hover:text-slate-700" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            <span aria-hidden="true">|</span>
            <a className="underline decoration-slate-300 underline-offset-4 hover:text-slate-700" href={`tel:${CONTACT_PHONE}`}>
              {CONTACT_PHONE}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


