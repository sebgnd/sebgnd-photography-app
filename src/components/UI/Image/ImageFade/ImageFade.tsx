import { useState, FunctionComponent, useEffect, useRef } from 'react';

import styles from './ImageFade.module.css';

export type ImageFadeProps = {
	className?: string;
	src: string;
	alt: string;
	transitionTime?: number;
}

export const ImageFade: FunctionComponent<ImageFadeProps> = ({ className, src, alt, transitionTime = .5 }) => {
	const [show, setShow] = useState<boolean>(false);
	const previousImage = useRef(new Set<string>());

	const getClasses = () => {
		const currentClass = className ? className : '';
		const classes = [currentClass, styles.image];

		classes.push(show ? styles.show : styles.hide);
		
		return classes.join(' ');
	}

	useEffect(() => {
		if (previousImage.current.has(src)) {
			setShow(true);

			return;
		}

		previousImage.current.add(src);
		setShow(false);
	}, [src])

	return (
		<img 
			style={{
					transition: `opacity ${transitionTime}s linear`
			}}
			src={src} 
			className={getClasses()} 
			alt={alt} 
			onLoad={() => {
					setShow(true)
			}} 
		/>
	);
};
