import { useLayoutEffect } from 'react';
import type { FunctionComponent } from 'react';

export type GoogleAuthenticationButtonProps = {
	onSignIn: (idToken: string) => void,
	clientId: string,
};

export const GoogleAuthenticationButton: FunctionComponent<GoogleAuthenticationButtonProps> = ({ onSignIn, clientId }) => {
	useLayoutEffect(() => {
		// @ts-ignore Google sign in does not have an npm package and is a global package
		google.accounts.id.initialize({
			client_id: clientId,
			callback: (response) => onSignIn(response.credential),
		});
		
		// @ts-ignore Same as previous warning
		google.accounts.id.renderButton(
			document.getElementById('googleSignInButton')!,
			{
				theme: 'outline',
				size: 'medium',
			},
		)
	}, [onSignIn, clientId]);

	return (
		<div id="googleSignInButton" />
	);
};
