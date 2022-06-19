import React, { useCallback, useRef } from 'react';
import type { FunctionComponent, ReactNode } from 'react';

import { useEventListener } from 'hooks';

export type ClickOutsideProps = {
	children: ReactNode,
	containerClassName?: string,
	onClickOutside: () => void,
};

export const ClickOutside: FunctionComponent<ClickOutsideProps> = ({
	children,
	onClickOutside,
	containerClassName,
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = useCallback((event: Event) => {
		if (!ref.current) {
			return;
		}
	
		const outsideDropdown = !ref.current.contains(event.target as Node);

		if (outsideDropdown) {
			onClickOutside();
		}
	}, [onClickOutside]);

	useEventListener('mousedown', handleClickOutside);

	return (
		<div className={containerClassName} ref={ref}>
			{children}
		</div>
	)
}