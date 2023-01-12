import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function Login() {
	const { loginWithRedirect } = useAuth0();

	return <button onClick={() => loginWithRedirect()}>Login</button>;
}
