import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Flower, { Sparkle } from "./Flower.jsx";

const sparkles = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 8) % 92 + 2}%`,
  top: `${(i * 53 + 11) % 88 + 4}%`,
  animationDelay: `${(i % 5) * 0.6}s`,
  scale: 0.6 + (i % 4) * 0.25,
}));

const Chars = ({ text }) =>
  text.split("").map((c, i) => (
    <span className="ch" key={i}>{c === " " ? "\u00A0" : c}</span>
  ));

export default function Opening({ onDone }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const quick = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onDone });
      tl.from(".op-flower", { scale: 0.4, rotate: -40, opacity: 0, duration: 1.8, ease: "power3.out", stagger: 0.2 })
        .from(".op-line1 .ch", { yPercent: 110, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.04 }, 0.4)
        .from(".op-line2 .ch", { yPercent: 110, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.07 }, 1.3)
        .from(".op-date", { opacity: 0, y: 10, duration: 1 }, 2.4)
        .to({}, { duration: quick ? 0.5 : 2 })
        .to(root.current, { opacity: 0, scale: 1.06, duration: 1.1, ease: "power2.inOut" });
    }, root);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <section className="opening" ref={root} aria-label="Birthday introduction">
      {sparkles.map((s, i) => (
        <Sparkle key={i} style={{ left: s.left, top: s.top, animationDelay: s.animationDelay, transform: `scale(${s.scale})` }} />
      ))}
      <Flower className="op-flower f-tl" size={200} />
      <Flower className="op-flower f-br" size={240} />
      <Flower className="op-flower f-tr" size={90} />
      <h1 className="op-title">
        <span className="op-line op-line1"><Chars text="Happy Birthday" /></span>
        <span className="op-line op-line2"><Chars text="Nabira!" /></span>
      </h1>
      <p className="op-date">2 November 2026</p>
    </section>
  );
}
