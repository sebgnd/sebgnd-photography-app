import { useEffect, useCallback, useState } from 'react';

export const useScrolling = () => {
    const [enabled, setScroll] = useState(true);

    const handleScroll = useCallback((event: Event) => {
        if (!enabled) {
            event.preventDefault();
        }
    }, [enabled]);

    useEffect(() => {
        window.addEventListener('wheel', handleScroll, {
            passive: false,
        });

        return () => {
            window.removeEventListener('wheel', handleScroll);
        }
    }, [handleScroll])

    return [enabled, setScroll] as const;
};
