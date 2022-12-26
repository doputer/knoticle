import { useEffect, useRef, useState } from 'react';

const useScroll = () => {
  const [offset, setOffset] = useState(0);
  const lastScrollPosition = useRef(0);

  const handleScroll = () => {
    const { scrollY } = window;

    const gap = scrollY - lastScrollPosition.current;

    if (gap > 0) setOffset((prev) => Math.min(64, prev + gap));
    else setOffset((prev) => Math.max(0, prev + gap));

    lastScrollPosition.current = scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { offset };
};

export default useScroll;
