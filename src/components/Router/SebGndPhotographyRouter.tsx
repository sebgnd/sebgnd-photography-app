import { Routes, Route, BrowserRouter } from 'react-router-dom';
import type { FunctionComponent } from 'react';

import { RestrictedRoute } from 'components/Authentication/RestrictedRoute';

type RestrictedPath = {
	restricted: true,
	loginPath: string,
};

type UnrestrictedPath = {
	restricted: false,
}

type SubRouter = (RestrictedPath | UnrestrictedPath) & {
	layout: JSX.Element,
	routes: {
		[subPath: string | 'index']: JSX.Element,
	},
};

export type SebGndPhotographyRouterProps = {
	router: {
		[path: string | 'index']: SubRouter | JSX.Element,
	}
};

const getPath = (path: string) => path === 'index' ? '*' : path;
const getLayout = (subRouter: SubRouter) => {
	if (!subRouter.restricted) {
		return subRouter.layout;
	}

	return (
		<RestrictedRoute fallback={subRouter.loginPath}>
			{subRouter.layout}
		</RestrictedRoute>
	);
};
const isSubRouter = (value: any): value is SubRouter => {
	return typeof value.routes === 'object';
}

export const SebGndPhotographyRouter: FunctionComponent<SebGndPhotographyRouterProps> = ({ router }) => {
	return (
		<BrowserRouter>
			<Routes>
				{Object
					.entries(router)
					.map(([path, elementOrRouter]) => {
						if (!isSubRouter(elementOrRouter)) {
							const element = elementOrRouter as JSX.Element;

							return (
								<Route
									key={path}
									index={path === 'index'}
									path={path !== 'index' ? path : undefined}
									element={element} />
							);
						}

						const subRouter = elementOrRouter;
						const routes = Object.entries(subRouter.routes).map(([subPath, element]) => (
							<Route
								key={`${path}-${subPath}`}
								index={subPath === 'index'}
								path={subPath !== 'index' ? subPath : undefined}
								element={element}
							/>
						));

						return (
							<Route
								key={path}
								path={getPath(path)}
								element={getLayout(subRouter)}
							>
								{routes}
							</Route>
						);
					})
				}
			</Routes>
		</BrowserRouter>
	);
};