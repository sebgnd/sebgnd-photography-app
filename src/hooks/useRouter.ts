import { useContext, useMemo } from 'react'

import { RouteInfo, SebGndPhotographyRouterContext } from 'contexts/SebGndPhotographyRouterContext';
import type { TopNavigationBarProps } from 'components/Navigation/NavigationBar/TopNavigationBar';

export type RouteForTopNavigationBarProps = Pick<TopNavigationBarProps, 'logo' | 'items'>;

const buildNavigationPropsFromRouteInfo = (info: RouteInfo, logoSrc: string): RouteForTopNavigationBarProps => {
	const { routes } = info;

	/**
	 * The index route will be used when clicking the logo in
	 * the navigation bar.
	 */
	const indexRoute = routes.find((route) => route.index);

	return {
		logo: {
			src: logoSrc,
			url: indexRoute?.url || '',
		},
		/**
		 * A route without a name will not be displayed in the navigation bar.
		 */
		items: routes
			.filter((route) => route.name)
			.map(({ name, url }) => ({
				name: name!,
				url
			})),
	}
}

export const useRouter = (path: string, logoSrc: string) => {
	const routerContext = useContext(SebGndPhotographyRouterContext);
	const routerInfo = routerContext.routes[path];

	if (!routerInfo) {
		throw new Error('Invalid router path');
	}

	const propsForNavigation = useMemo(() => (
		buildNavigationPropsFromRouteInfo(
			routerInfo,
			logoSrc,
		)
	), [routerInfo, logoSrc]);

	return {
		info: routerInfo,
		propsForNavigation,
	};
}