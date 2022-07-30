import { Fragment, useMemo } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import type { FunctionComponent } from 'react';

import { RestrictedRoute } from 'components/Authentication/RestrictedRoute';

import { SebGndPhotographyRouterContext } from 'contexts/SebGndPhotographyRouterContext';

type RestrictedPath = {
  restricted: true,
  login: {
    path: string,
    element: JSX.Element,
  },
};

type UnrestrictedPath = {
  restricted: false,
}

type SubRouter = (RestrictedPath | UnrestrictedPath) & {
  layout: JSX.Element,
  logo: string,
  routes: {
    [subPath: string | 'index']: {
      name?: string,
      index?: boolean,
      element: JSX.Element,
    }
  },
};

export type SebGndPhotographyRouterProps = {
  router: {
    [path: string | 'index']: SubRouter,
  },
  fallback?: JSX.Element,
};

const getPath = (path: string) => path === 'index' ? '*' : path;

const buildRoute = (...paths: string[]) => (
  paths
    .filter((path) => path !== 'index')
    .join('/')
);

const getLayout = (subRouter: SubRouter) => {
  if (!subRouter.restricted) {
    return subRouter.layout;
  }

  return (
    <RestrictedRoute fallback={subRouter.login.path}>
      {subRouter.layout}
    </RestrictedRoute>
  );
};

export const SebGndPhotographyRouter: FunctionComponent<SebGndPhotographyRouterProps> = ({
  router,
  fallback,
}) => {
  const routerInfo = useMemo(() => Object
    .entries(router)
    .reduce((acc, [path, subRouter]) => {
      return {
        ...acc,
        [path]: {
          loginRoute: subRouter.restricted && buildRoute(path, subRouter.login.path),
          logo: subRouter.logo,
          routes: Object
            .entries(subRouter.routes)
            .map(([subPath, route]) => ({
              url: `/${buildRoute(path, subPath)}`,
              /**
               * An index has `either` the index boolean at true, or
               * its path is "index"
               */
              index: route.index || subPath === 'index' || false,
              name: route.name,
            })),
        },
      };
    }, {}),
  [router],
  );

  return (
    <SebGndPhotographyRouterContext.Provider value={{ routes: routerInfo }}>
      <BrowserRouter>
        <Routes>
          {Object
            .entries(router)
            .map(([path, subRouter]) => {
              const routeElements = Object.entries(subRouter.routes).map(([subPath, { element }]) => (
                <Route
                  key={`${path}-${subPath}`}
                  index={subPath === 'index'}
                  path={subPath !== 'index' ? subPath : undefined}
                  element={element}
                />
              ));

              return (
                <Fragment key={path}>
                  {(subRouter.restricted) && (
                    <Route
                      path={buildRoute(path, subRouter.login.path)}
                      element={subRouter.login.element}
                    />
                  )}
                  <Route
                    path={getPath(path)}
                    element={getLayout(subRouter)}
                  >
                    {routeElements}
                    <Route
                      path="*"
                      element={fallback}
                    />
                  </Route>
                </Fragment>
              );
            })
          }
        </Routes>
      </BrowserRouter>
    </SebGndPhotographyRouterContext.Provider>
  );
};
