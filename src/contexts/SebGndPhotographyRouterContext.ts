import React from 'react';

export type RouteInfo = {
	loginRoute?: string,
	routes: Array<{
		url: string,
		index: boolean,
		name?: string,
	}>,
};

export type SebGndPhotographyRouterContextType = {
	routes: {
		[path: string]: RouteInfo,
	},
};

export const SebGndPhotographyRouterContext = React.createContext<SebGndPhotographyRouterContextType>({
	routes: {},
});