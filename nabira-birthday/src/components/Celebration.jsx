import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { burst } from "../lib/confetti.js";
import Flower from "./Flower.jsx";

export default function Celebration({ onOpen }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".ce-word", { yPercent: 100, opacity: 0, duration: 1, stagger: 0.12 })
        .from(".ce-sub", { opacity: 0, y: 14, duration: 0.9 }, "-=0.4")
        .from(".ce-btn", { opacity: 0, scale: 0.92, duration: 0.8 }, "-=0.4")
        .from(".ce-flower", { opacity: 0, scale: 0.6, rotate: -25, duration: 1.6, stagger: 0.15 }, 0);
    }, root);
    const id = setTimeout(() => burst(120), 500);
    return () => { ctx.revert(); clearTimeout(id); };
  }, []);

  return (
    <section className="screen celebration" ref={root}>
      <Flower className="ce-flower f-tl" size={170} />
      <Flower className="ce-flower f-br" size={210} />
      <h2 className="display">
        {["A Little", "Celebration", "for You"].map((w) => (
          <span className="mask" key={w}><span className="ce-word">{w}</span></span>
        ))}
      </h2>
      <p className="ce-sub lead">Today is yours. Take a moment, there is something written for you.</p>
      <button className="btn ce-btn" onClick={onOpen}>Open Your Birthday Note</button>
    </section>
  );
}
