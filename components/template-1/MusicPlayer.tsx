"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { MEDIA } from "@/lib/event";
type Ctx = { playing: boolean; play: () => void; toggle: () => void };
const MusicCtx = createContext<Ctx>({ playing: false, play: () => {}, toggle: () => {} });
export const useMusic = () => useContext(MusicCtx);

function Provider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  // One shared Audio instance, created lazily on the first user gesture (never on page load).
  const get = useCallback(() => {
    if (!ref.current) {
      const a = new Audio(MEDIA.music.src);
      a.loop = true; a.volume = MEDIA.music.volume; a.preload = "none";
      a.addEventListener("play", () => setPlaying(true));
      a.addEventListener("pause", () => setPlaying(false));
      ref.current = a;
    }
    return ref.current;
  }, []);
  const play = useCallback(() => { get().play().catch(() => setPlaying(false)); }, [get]);
  const toggle = useCallback(() => { const a = get(); if (a.paused) play(); else a.pause(); }, [get, play]);
  useEffect(() => () => { ref.current?.pause(); }, []);
  return <MusicCtx.Provider value={{ playing, play, toggle }}>{children}</MusicCtx.Provider>;
}

function FloatingButton() {
  const { playing, toggle } = useMusic();
  return (
    <button type="button" onClick={toggle} aria-label={playing ? "Pause background music" : "Play background music"} aria-pressed={playing}
      className="fixed z-40 bottom-4 left-4 md:left-auto md:right-6 md:bottom-6 h-12 w-12 rounded-full bg-dusty-700 text-white shadow-lg flex items-center justify-center hover:bg-dusty-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-dusty-300">
      {playing ? (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>)
        : (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>)}
    </button>
  );
}

export default function DesignShell({ children }: { children: React.ReactNode }) {
  return (<Provider>{children}<FloatingButton /></Provider>);
}
