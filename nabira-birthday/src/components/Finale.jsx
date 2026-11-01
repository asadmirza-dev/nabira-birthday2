import { useRef, useState } from "react";
import gsap from "gsap";
import useReveal from "../lib/useReveal.js";
import { burst } from "../lib/confetti.js";
import Flower from "./Flower.jsx";

export default function Finale() {
  const root = useRef(null);
  const [done, setDone] = useState(false);
  useReveal(root);

  const surprise = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const origin = { x: (r.left + r.width / 2) / innerWidth, y: (r.top + r.height / 2) / innerHeight };
    burst(110, origin);
    setTimeout(() => burst(160, { x: 0.5, y: 0.7 }), 350);
    setDone(true);
    gsap.fromTo(".fi-final", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.4 });
    gsap.to(".fi-flower", { rotate: "+=40", scale: 1.08, duration: 2, ease: "power2.out", stagger: 0.2 });
  };

  return (
    <section className="screen finale" ref={root}>
      <Flower className="fi-flower f-tr" size={150} />
      <Flower className="fi-flower f-bl" size={190} />
      <h2 className="display" data-reveal>A Year Filled With Khair.</h2>
      <button className="btn" onClick={surprise} disabled={done} data-reveal>
        {done ? "Happy Birthday, Nabira" : "Your Birthday Surprise"}
      </button>
      <p className="fi-final" style={{ opacity: 0 }}>May Allah always guide your steps. Ameen 💖</p>
     {/* <p className="signature">By Asad.</p> */}
    </section>
  );
}
