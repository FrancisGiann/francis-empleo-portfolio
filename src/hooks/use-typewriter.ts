import { useEffect, useState } from "react";

// Plays once per session — navigating back to / within the session shows the full text.
let played = false;

export function useTypewriter(text: string, speed = 55, startDelay = 450) {
  const [count, setCount] = useState(() => (played ? text.length : 0));
  const [done, setDone] = useState(played);

  useEffect(() => {
    if (played) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      setDone(true);
      played = true;
      return;
    }
    let i = 0;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          window.clearInterval(interval);
          setDone(true);
          played = true;
        }
      }, speed);
    }, startDelay);
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { display: text.slice(0, count), done };
}
