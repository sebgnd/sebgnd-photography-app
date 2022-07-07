import React, { useEffect, useRef, useState, useCallback, FunctionComponent, ReactNode } from 'react';

// TODO: Remove lodash
import { throttle } from 'lodash';

import ParallaxContainer from './ParallaxContainer';

interface ParallaxProp {
	img: string;
	speed: number;
	children: ReactNode,
}

interface BackgroundStyle {
	backgroundPositionY: string;
	backgroundSize: string;
}


export const Parallax: FunctionComponent<ParallaxProp> = ({ img, speed, children }) => {
	const parallaxElemRef = useRef<HTMLDivElement>(null);
	const topOffset = useRef<number>(0);
	const height = useRef<number>(0);

	const [backgroundLoaded, setBackgroundLoaded] = useState<boolean>(false);
	const [backgroundStyle, setBackgroundStyle] = useState<BackgroundStyle>({
		backgroundPositionY: '',
		backgroundSize: 'cover'
	});

	const throttleTime: number = 7;

	const isElementVisible = (): boolean => {
		if (!parallaxElemRef || !parallaxElemRef.current) {
			return false;
		}

		const position: DOMRect = parallaxElemRef.current.getBoundingClientRect();
		const elementVisible = position.top < window.innerHeight && position.bottom >= 0;

		return elementVisible;
	}

	const updateBackgroundSize = (): void => {
		const elementHeight = parallaxElemRef.current!.scrollHeight;

		if (elementHeight > window.innerHeight) {
			setBackgroundStyle((prevBackgroundStyle) => { 
				return {
					...prevBackgroundStyle, 
					backgroundSize: `auto ${elementHeight}px` 
				}
			});

			return;
		}

		setBackgroundStyle((prevBackgroundStyle) => { 
			return {
				...prevBackgroundStyle, 
				backgroundSize: 'cover' 
			}
		});
	}

	const getTopOffset = useCallback((): number => {
		return window.innerHeight * speed;
	}, [speed]);

	const getNewTop = useCallback((): number => {
		const bottomPageOffset = window.scrollY + window.innerHeight;
		const intoElementOffset = bottomPageOffset - parallaxElemRef.current!.offsetTop;
		const newTop = topOffset.current - intoElementOffset * speed;

		return newTop;
	}, [speed]);

	const updatePosition = (): void => {
		if (!isElementVisible()) {
				return;
		}

		const newTop = getNewTop();

		setBackgroundStyle(prevBackgroundStyle => { 
			return {
					...prevBackgroundStyle,
					backgroundPositionY: `${newTop}px` 
			}
		});
	}

	const handleScroll = (): void => {
		updatePosition();
	}
	const handleScrollThrottled = throttle(handleScroll, throttleTime);

	const handleResize = (): void => {
		topOffset.current = getTopOffset();

		updateBackgroundSize();
		updatePosition();
	}

	const handleResizeThrottled = throttle(handleResize, throttleTime);

	const handleBackgroundLoad = useCallback(() => {
		const image = new Image();
		
		image.src = img;
		image.onload = () => {
			setBackgroundLoaded(true);
		}
	}, [img]);

	const addEventListener = useCallback((): void => {
		window.addEventListener('scroll', handleScrollThrottled);
		window.addEventListener('resize', handleResizeThrottled);
	}, [handleScrollThrottled, handleResizeThrottled]);

	const removeEventListener = useCallback((): void => {
		window.removeEventListener('scroll', handleScrollThrottled);
		window.removeEventListener('resize', handleResizeThrottled);
	}, [handleScrollThrottled, handleResizeThrottled]);

	useEffect(() => {
		topOffset.current = getTopOffset();
		height.current = parallaxElemRef.current!.clientHeight;

		if (height.current > window.innerHeight) {
			parallaxElemRef.current!.style.backgroundSize = `auto ${height.current}`;
		}

		parallaxElemRef.current!.style.backgroundPositionY = `${getNewTop()}px`;
		
		handleBackgroundLoad();
		addEventListener();

		return () => {
			removeEventListener();
		};
  }, [
		handleBackgroundLoad, 
		getNewTop,
		addEventListener,
		removeEventListener,
		getTopOffset,
	]);

	return (
		<ParallaxContainer ref={parallaxElemRef} style={{...backgroundStyle}} backgroundImage={img} opacity={backgroundLoaded ? 1 : 0}>
			{children}
		</ParallaxContainer>
	);
}
