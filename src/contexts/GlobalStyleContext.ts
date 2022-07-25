import React from 'react';

export type GlobalStyleContextContextType = {
	layout: {
		navigationBarSize: number,
		footerSize: number,
		allowNavigationOverlay: boolean,
	},
};

export const GlobalStyleContext = React.createContext<GlobalStyleContextContextType>({
	layout: {
		navigationBarSize: 0,
		footerSize: 0,
		allowNavigationOverlay: false,
	},
});