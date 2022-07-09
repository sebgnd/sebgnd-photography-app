import { FunctionComponent, ReactNode, useMemo } from 'react';

import styles from './Centered.module.scss';

export type CenteredProps = {
	centerHorizontal?: boolean;
	centerVertical?: boolean;
	fullScreen?: boolean;
	insideContainer?: boolean,
	zIndex?: number;
	children: ReactNode,
}

export const Centered: FunctionComponent<CenteredProps> = ({
	centerHorizontal,
	centerVertical,
	fullScreen,
	insideContainer,
	zIndex,
	children,
}) => {
	const classNames = useMemo(() => {
		const classes = [styles.centeringContainer];

		if (centerHorizontal) {
			classes.push(styles.centerHorizontal);
		}

		if (centerVertical) {
			classes.push(
				fullScreen
					? styles.fullScreen
					: styles.centerVertical
			);
		}

		if (insideContainer) {
			classes.push(styles.insideContainer);
		}
		
		return classes.join(' ');
	}, [
		centerVertical,
		centerHorizontal,
		fullScreen,
		insideContainer
	]);

	return (
		<>
			{(centerHorizontal || centerVertical) ? (
				<div style={{ zIndex }} className={[styles.centeringContainer, classNames].join(' ')}>
					{children}
				</div>
			) : (
				{children}
			)}
		</>
	)
}
