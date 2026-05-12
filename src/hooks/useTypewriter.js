import { useState, useEffect, useMemo } from "react";

export function useTypewriter(words, speed = 80, pause = 1000) {
  const stableWords = useMemo(() => words, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(stableWords[index].slice(0, i));
      i++;
      if (i > stableWords[index].length) {
        clearInterval(interval);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % stableWords.length);
        }, pause);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [index, stableWords, speed, pause]);

  return text;
}
