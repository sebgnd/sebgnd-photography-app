import React, { useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import type { FunctionComponent } from 'react';

import { useAppDispatch } from 'redux/store';

import { login } from 'redux/slices/user/user.thunk';

import { useAuthenticated } from 'hooks';

import { Text } from 'components/UI/Content/Text/Text';
import { GoogleAuthenticationButton } from 'components/Authentication/GoogleAuthenticationButton/GoogleAuthenticationButton';
import { SilentTokenRefresh } from 'components/Authentication/SilentTokenRefresh';

import styles from './Authentication.module.scss';

export const Authentication: FunctionComponent = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isAuthenticated = useAuthenticated();

	const handleSignIn = useCallback(
		async (idToken: string) => {
			await dispatch(login(idToken));

			navigate('/admin/home');
		},
		[dispatch, navigate]
	);

	if (isAuthenticated) {
		return (
			<Navigate to="/admin/home" />
		)
	}

	return (
		<SilentTokenRefresh>
			<div className={styles.wrapper}>
				<div className={styles.container}>
					{/* TODO: Update with real logo */}
					<div className={styles.logo}>
						<Text text="SebGND Photography - Administration panel" />
					</div>
					<GoogleAuthenticationButton
						clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
						onSignIn={handleSignIn}
					/>
				</div>
			</div>
		</SilentTokenRefresh>
	)
}