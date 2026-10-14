"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { statement } from "@/lib/content";

function Word({ p, a, b, word }: { p: MotionValue<number>; a: number; b: number; word: string }) {
  const opacity = useTransform(p, [a, b], [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{word}</motion.span>{" "}
    </>
  );
}

/** One big sentence that lights up word by word as it crosses the screen. */
export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = statement.split(" ");

  return (
    <section ref={ref} className="statement section" aria-label="Our view">
      <div className="wrap">
        <p className="statement-text" aria-label={statement}>
          {words.map((w, i) => {
            const a = (i / words.length) * 0.85;
            const b = a + 0.15;
            return reduce ? (
              <span key={i}>{w} </span>
            ) : (
              <Word key={i} p={scrollYProgress} a={a} b={b} word={w} />
            );
          })}
        </p>
      </div>
    </section>
  );
}
