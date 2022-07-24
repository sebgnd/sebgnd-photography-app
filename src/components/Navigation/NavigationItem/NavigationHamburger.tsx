import React  from 'react';
import type { FunctionComponent } from 'react';

import { IconButton } from 'components/UI/Button';

export type NavigationHamburgerProps = {
  onClick(): void;
};

export const NavigationHamburger: FunctionComponent<NavigationHamburgerProps> = ({ onClick }) => {
	return (
		<IconButton
			variant="light"
			color="default"
			icon="bars"
			onClick={onClick}
		/>
	);
}