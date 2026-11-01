import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Cake from "./Cake";
function CelebrationBurst() { const [particles, setParticles] = useState([]); useEffect(() => { const items = Array.from({ length: 100 }, (_, i) => ({ id: i, left: Math.random() * 100, delay: Math.random() * 0.8, duration: 2 + Math.random() * 2, size: 5 + Math.random() * 8, rotation: Math.random() * 360, color: [ "#ff6b9a", "#ffd166", "#ffffff", "#c084fc", "#ff9f68", "#f5b7c8", ][Math.floor(Math.random() * 6)], })); setParticles(items); }, []); return ( <div className="confetti-container"> {particles.map((p) => ( <span key={p.id} className="confetti-particle" style={{ left: `${p.left}%`, width: `${p.size}px`, height: `${p.size * 1.5}px`, backgroundColor: p.color, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s`, transform: `rotate(${p.rotation}deg)`, }} /> ))} </div> ); }
export default function CakeScene() {
    const [isCut, setIsCut] = useState(false);

    return (
        <section className="cake-section">

            <h2>A Little Birthday Visual Treat</h2>

            <p>Make a wish and enjoy your special cake!</p>

            <div className="cake-canvas">

                <Canvas
                    camera={{ position: [0, 2.1, 5], fov: 38 }}
                    shadows
                >
                    <ambientLight intensity={1.5} />

                    <directionalLight
                        position={[3, 5, 4]}
                        intensity={2}
                        castShadow
                    />

                    <pointLight
                        position={[-3, 3, 2]}
                        intensity={1}
                        color="#ffd1dc"
                    />

                    <Cake isCut={isCut} />
                </Canvas>

            </div>

           {isCut && <CelebrationBurst />}

<button
  className="cut-cake-btn"
  onClick={() => setIsCut(true)}
  disabled={isCut}
>
  {isCut ? "Enjoy Your Cake! 🍰" : "Cut the Cake 🎂"}
</button>

        </section>
    );
}
