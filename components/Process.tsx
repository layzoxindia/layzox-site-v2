"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { processSteps } from "@/lib/content";

function Step({ index, title, text }: { index: number; title: string; text: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "start 45%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.32, 1]);
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.li ref={ref} className="step" style={reduce ? undefined : { opacity }}>
      <span className="step-dot" aria-hidden="true">
        <motion.i style={{ scale: reduce ? 1 : fill }} />
      </span>
      <span className="step-n display" aria-hidden="true">
        {index + 1}
      </span>
      <div>
        <h3 className="step-title display">{title}</h3>
        <p className="lead">{text}</p>
      </div>
    </motion.li>
  );
}

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="section process">
      <div className="wrap process-grid">
        <header className="process-head">
          <h2 className="h2">How a project runs</h2>
          <p className="lead">
            Scope, decisions and ownership stay visible from the first call to the last handover, so there are no
            surprises at the end.
          </p>
        </header>

        <div className="process-list-wrap">
          <div className="process-rail" aria-hidden="true">
            <motion.i style={{ scaleY }} />
          </div>
          <ol ref={listRef} className="process-list">
            {processSteps.map((s, i) => (
              <Step key={s.title} index={i} title={s.title} text={s.text} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
