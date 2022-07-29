import { useCallback, useEffect, useState, useRef } from 'react';

export type UseEndPageReachedConfig = {
  offsetThreshold: number,
}

const defaultConfig: UseEndPageReachedConfig = {
  offsetThreshold: 5,
};

export const useEndPageReached = (config: UseEndPageReachedConfig = defaultConfig) => {
  const { offsetThreshold } = config;

  const [reached, setReached] = useState(false);
  const endWindowRef = useRef(false);

  const handleScroll = useCallback(() => {
    const scrollYBottom = Math.round(window.scrollY + window.innerHeight);
    const pageHeight = document.body.scrollHeight;

    const isBottomReachedWithOffset = scrollYBottom > pageHeight - offsetThreshold;

    if (isBottomReachedWithOffset !== endWindowRef.current) {
      setReached(isBottomReachedWithOffset);
      endWindowRef.current = isBottomReachedWithOffset;
    }
  }, [offsetThreshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return reached;
};
