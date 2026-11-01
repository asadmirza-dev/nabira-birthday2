import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Opening from "./components/Opening.jsx";
import Celebration from "./components/Celebration.jsx";
import Note from "./components/Note.jsx";
import Duas from "./components/Duas.jsx";
import Finale from "./components/Finale.jsx";

gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const [intro, setIntro] = useState(true);
  const [opened, setOpened] = useState(false);

  const finishIntro = useCallback(() => setIntro(false), []);

  useEffect(() => {
    document.body.classList.toggle("locked", intro);

    return () => {
      document.body.classList.remove("locked");
    };
  }, [intro]);

  const handleOpenNote = () => {
    setOpened(true);

  
    setTimeout(() => {
      gsap.to(window, {
        scrollTo: { y: "#note", offsetY: 0 },
        duration: 0.7,
        ease: "power3.inOut",
      });
    }, 100);
  };

  return (
    <>
      {intro && <Opening onDone={finishIntro} />}

      {!intro && (
        <main className="page">
          <Celebration
            opened={opened}
            onOpen={handleOpenNote}
          />

          {opened && (
            <>
              <Note />
              <Duas />
              <Finale />
            </>
          )}
        </main>
      )}
    </>
  );
}

