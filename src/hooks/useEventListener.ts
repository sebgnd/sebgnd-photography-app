import { useEffect } from 'react';

const useEventListener = <K extends keyof WindowEventMap>(
	event: K,
	listener: Parameters<typeof window.addEventListener>[1],
	options?: Parameters<typeof window.addEventListener>[2],
) => {
	useEffect(() => {
		window.addEventListener(event, listener, options);

		return () => {
			window.removeEventListener(event, listener);
		}
	}, [event, listener, options])
}

export default useEventListener;