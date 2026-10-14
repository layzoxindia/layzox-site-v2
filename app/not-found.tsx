import Link from "next/link";
import Shell from "@/components/Shell";

export default function NotFound() {
  return (
    <Shell>
      <section className="error-page">
        <div className="wrap">
          <p className="crumbs">404</p>
          <h1 className="page-title display">This page does not exist.</h1>
          <p className="lead page-lead">The link may be old or mistyped. Head back to the home page, or tell us what you were looking for.</p>
          <p style={{ marginTop: 28 }}>
            <Link className="btn btn-primary" href="/">
              Back to home
            </Link>
          </p>
        </div>
      </section>
    </Shell>
  );
}
