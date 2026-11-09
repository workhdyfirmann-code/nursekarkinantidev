"use client";

import { useEffect, useRef, useState } from "react";

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function setAudioRef(audio: HTMLAudioElement | null) {
    audioRef.current = audio;
    if (audio) audio.volume = 0.1;
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startAudio = () => {
      audio.play().then(() => setPlaying(true)).catch(() => undefined);
    };

    startAudio();
    window.addEventListener("pointerdown", startAudio, { once: true });
    window.addEventListener("keydown", startAudio, { once: true });
    return () => {
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("keydown", startAudio);
    };
  }, []);

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return <><audio ref={setAudioRef} src="/audio-gamelan.mp3" autoPlay loop preload="none" onEnded={() => setPlaying(false)} /><button className="ambient-audio" type="button" onClick={toggleAudio} aria-label={playing ? "Jeda musik gamelan" : "Putar musik gamelan"} aria-pressed={playing}><span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span><span>{playing ? "Pause ambience" : "Play ambience"}</span></button></>;
}
