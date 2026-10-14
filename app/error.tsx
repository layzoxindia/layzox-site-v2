"use client";

import { company } from "@/lib/content";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="error-page">
      <div className="wrap">
        <p className="crumbs">Something went wrong</p>
        <h1 className="page-title display">We hit a snag loading this page.</h1>
        <p className="lead page-lead">
          Please try again. If it keeps happening, call us on {company.phone1}.
        </p>
        <p style={{ marginTop: 28 }}>
          <button type="button" className="btn btn-primary" onClick={reset}>
            Try again
          </button>
        </p>
      </div>
    </section>
  );
}
