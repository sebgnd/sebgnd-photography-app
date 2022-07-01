import React, { useCallback } from 'react';
import type { FunctionComponent } from 'react';

import { Text } from 'components/UI/Content/Text/Text';
import { GoogleAuthenticationButton } from 'components/Authentication/GoogleAuthenticationButton/GoogleAuthenticationButton';

import styles from './Authentication.module.scss';

export const Authentication: FunctionComponent = () => {
	const handleSignIn = useCallback((idToken: string) => {
		console.log(idToken);
	}, []);

	return (
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
	)
}