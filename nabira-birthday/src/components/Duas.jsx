import { useRef } from "react";
import useReveal from "../lib/useReveal.js";
import { duas } from "../data/content.js";

export default function Duas() {
  const root = useRef(null);
  useReveal(root);
  return (
    <section className="duas" ref={root}>
      <h2 className="section-title" data-reveal>Duas for You</h2>
      <div className="stem">
        {duas.map((d, i) => (
          <div className={`dua ${i % 2 ? "right" : "left"}`} key={d.title} data-reveal>
            <span className="bud" aria-hidden="true" />
            <h3>{d.title}</h3>
            <p>{d.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
