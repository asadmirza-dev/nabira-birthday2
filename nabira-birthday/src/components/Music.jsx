import { useEffect, useRef } from "react";

export default function Music() {
const audioRef = useRef(null);

useEffect(() => {
const audio = audioRef.current;
if (!audio) return;

audio.volume = 0.35;

const startMusic = async () => {
  try {
    await audio.play();

    document.removeEventListener("pointerdown", startMusic);
    document.removeEventListener("keydown", startMusic);
  } catch (error) {
    console.log("Music is waiting for user interaction.");
  }
};

// Try autoplay when website opens
startMusic();

// If browser blocks autoplay, start on first interaction
document.addEventListener("pointerdown", startMusic);
document.addEventListener("keydown", startMusic);

return () => {
  document.removeEventListener("pointerdown", startMusic);
  document.removeEventListener("keydown", startMusic);
  audio.pause();
};


}, []);

return ( <audio
   ref={audioRef}
   src="/audio/birthday-music.mp3"
   loop
   preload="auto"
 />
);
}
