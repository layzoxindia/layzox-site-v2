import type { ReactNode } from "react";
import SmoothScroll from "./SmoothScroll";
import Header from "./Header";
import Footer from "./Footer";
import MobileBar from "./MobileBar";
import Fx from "./Fx";

/** The frame shared by the home page and every inner page. */
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SmoothScroll />
      <Fx />
      <div className="grain" aria-hidden="true" />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileBar />
    </>
  );
}
