import { useCallback, useState } from 'react';

import { useEventListener } from 'hooks';

export const useScrolling = () => {
  const [enabled, setScroll] = useState(true);

  const handleScroll = useCallback((event: Event) => {
    if (!enabled) {
      event.preventDefault();
    }
  }, [enabled]);

  useEventListener('wheel', handleScroll, {
    passive: false,
  });

  return [enabled, setScroll] as const;
};
