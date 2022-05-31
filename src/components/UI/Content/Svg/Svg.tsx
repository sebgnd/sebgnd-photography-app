import React, { FunctionComponent } from 'react';

import { icons, IconName } from './icons';

export type SvgProps = {
	name: IconName,
	size?: number,
};

export const Svg: FunctionComponent<SvgProps> = ({ name, size = 80 }) => {
	return (
		<svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
			{icons[name]}
		</svg>
	);
};
