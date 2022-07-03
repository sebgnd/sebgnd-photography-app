import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthenticated } from 'hooks';

import type { FunctionComponent, PropsWithChildren } from 'react';

export type RestrictedRouteProps = PropsWithChildren & {
	fallback: string,
}

export const RestrictedRoute: FunctionComponent<RestrictedRouteProps> = ({ children, fallback }) => {
	const isAuthenticated = useAuthenticated();

	/**
	 * Wrapping children in a fragment removes a typescript error
	 */
	return isAuthenticated
		? (
			<>
				{children}
			</>
		)
		: (
			<Navigate to={fallback} />
		);
};
