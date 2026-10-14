"use client";

import { motion, useReducedMotion } from "motion/react";
import { heroFacts } from "@/lib/content";
import { whatsappUrl } from "@/lib/enquiry";
import { ArrowRight, Chat } from "./Icons";
import { Scene } from "./Scenes";

const HEADLINE = "Your work, in one place.";

export default function Hero() {
  const reduce = useReducedMotion();
  const words = HEADLINE.split(" ");

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
        <div className="hero-horizon" />
      </div>

      <div className="wrap hero-inner">
        <h1 className="hero-title display" aria-label={HEADLINE}>
          {words.map((word, i) => (
            <span key={i} aria-hidden="true">
              <span className="word-mask">
                <motion.span
                  className="word"
                  initial={reduce ? false : { y: "112%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.07 }}
                >
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <motion.p
          className="hero-lead"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
        >
          Layzox builds custom software and automation for businesses worldwide. You try working
          software at every step, and you keep the code.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
        >
          <a href="#contact" className="btn btn-primary">
            Book a free call <ArrowRight />
          </a>
          <a
            href={whatsappUrl("Hello Layzox, I would like to discuss a project.")}
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Chat /> Chat on WhatsApp
          </a>
        </motion.div>

        <motion.div
          className="hero-stage"
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 1 }}
        >
          <div className="hero-frame">
            <Scene id="custom" label="Animated example of an operations dashboard with live requests" />
          </div>
          <div className="hero-chip hero-chip-a" aria-hidden="true">
            <span className="hero-chip-ic">
              <Chat />
            </span>
            <span>
              <b>New order on WhatsApp</b>
              <small>12 licences · Today</small>
            </span>
          </div>
        </motion.div>

        <motion.dl
          className="hero-facts"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          {heroFacts.map((f) => (
            <div key={f.title}>
              <dt>{f.title}</dt>
              <dd>{f.text}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
