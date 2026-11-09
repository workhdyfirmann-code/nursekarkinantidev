"use client";

import { useEffect, useState } from "react";

export function IntroOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2800);
    return () => window.clearTimeout(timer);
  }, []);

  return <div className={`intro-overlay ${visible ? "" : "intro-overlay-hidden"}`} aria-hidden={!visible}><div className="intro-overlay-mark">✦</div><p>NUR SEKAR KINANTI</p><span>Sanggar Tari Jawa Klasik Surakarta</span><button type="button" onClick={() => setVisible(false)}>Lewati</button></div>;
}
