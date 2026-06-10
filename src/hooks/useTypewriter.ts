import { useEffect, useState } from "react";

/**
 * Types out each word in `words` character by character, pausing between
 * words and cycling forever. `words` should be a stable reference
 * (module-level constant or memoized), otherwise the animation restarts
 * on every render.
 */
export function useTypewriter(
  words: readonly string[],
  speed = 80,
  pause = 1000,
): string {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length === 0) return;

    const word = words[index % words.length];
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const intervalId = setInterval(() => {
      i++;
      setText(word.slice(0, i));
      if (i >= word.length) {
        clearInterval(intervalId);
        timeoutId = setTimeout(() => {
          setIndex((prev) => (prev + 1) % words.length);
        }, pause);
      }
    }, speed);

    return () => {
      clearInterval(intervalId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [index, words, speed, pause]);

  return text;
}
