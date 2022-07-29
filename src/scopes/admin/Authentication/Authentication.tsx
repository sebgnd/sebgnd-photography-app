import { useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { FunctionComponent } from 'react';

import { useAppDispatch } from 'redux/store';

import { login } from 'redux/slices/user/user.thunk';
import { selectUserError, selectUserLoading } from 'redux/slices/user/user.selector';

import { useAuthenticated } from 'hooks';

import { Text } from 'components/UI/Content/Text/Text';
import { GoogleAuthenticationButton } from 'components/Authentication/GoogleAuthenticationButton';
import { SilentTokenRefresh } from 'components/Authentication/SilentTokenRefresh';
import { Spinner } from 'components/UI/Spinner/Spinner';

import styles from './Authentication.module.scss';
import { combineClasses } from 'libs/css/css';

export const Authentication: FunctionComponent = () => {
	const dispatch = useAppDispatch();

	const error = useSelector(selectUserError);
	const loading = useSelector(selectUserLoading);

	const isAuthenticated = useAuthenticated();

	const handleSignIn = useCallback(
		(idToken: string) => {
			dispatch(login(idToken));
		},
		[dispatch]
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
					<div className={styles.buttonContainer}>
						<GoogleAuthenticationButton
							clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
							onSignIn={handleSignIn}
						/>
						{loading && (
							<Spinner size="tiny" />
						)}
					</div>
				</div>
			</div>
			<div className={combineClasses(
				styles.error,
				error ? styles.visible : undefined,
			)}>
				<Text size="regular" text="Invalid credentials" />
			</div>
		</SilentTokenRefresh>
	)
}