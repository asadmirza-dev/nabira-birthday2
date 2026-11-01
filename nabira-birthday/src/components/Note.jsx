import { useRef } from "react";
import useReveal from "../lib/useReveal.js";
import { note } from "../data/content.js";

export default function Note() {
  const root = useRef(null);
  useReveal(root);
  return (
    <section id="note" className="screen note" ref={root}>
      <article className="paper" data-reveal>
        {note.map((p, i) => (
          <p key={i} className={i === 0 ? "note-first" : ""} data-reveal>{p}</p>
        ))}
        <span className="signoff" data-reveal>With sincere wishes</span>
      </article>
    </section>
  );
}
