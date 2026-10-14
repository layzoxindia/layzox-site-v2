import Shell from "@/components/Shell";
import Hero from "@/components/Hero";
import Converge from "@/components/Converge";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Proof from "@/components/Proof";
import Industries from "@/components/Industries";
import Products from "@/components/Products";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <Shell>
      <Hero />
      <Converge />
      <Statement />
      <Services />
      <Process />
      <Work />
      <Proof />
      <Industries />
      <Products />
      <Contact />
    </Shell>
  );
}
