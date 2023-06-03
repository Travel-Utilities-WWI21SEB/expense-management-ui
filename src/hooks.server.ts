import type { Handle } from '@sveltejs/kit';
import { tokenExpired } from './utils/token/tokenExpired';

const unauthorizedRoutes = [
	'/api/v1/users/login',
	'/api/v1/users/resend-token',
	'/api/v1/users/refresh-token',
	'/api/v1/users/register',
	'/api/v1/users/activate',
	'/api/v1/users/forgot-password'
];

export const handle = (async ({ event, resolve }) => {
	// Unauthorized routes: Just let them pass through
	if (unauthorizedRoutes.includes(event.url.pathname)) {
		const response = await resolve(event);
		return response;
	}

	// Authorized routes:
	// 1. Check if the token is valid
	// 2. If token is not valid, check if the refresh token is valid
	// 3. If refresh token is valid, refresh the token and execute the request
	// 4. If refresh token is not valid, redirect to login page

	// Step 1
	const token = event.cookies.get('token');
	if (token && !tokenExpired(token)) {
		event.request.headers.set('Authorization', `Bearer ${token}`);
		const response = await resolve(event);
		return response;
	}

	// Step 2
	const refreshToken = event.cookies.get('refreshToken');
	if (refreshToken && !tokenExpired(refreshToken)) {
		const refreshTokenResponse = await fetch(`http://localhost:8080/api/v1/users/refresh-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ refreshToken: refreshToken })
		});

		// Step 4
		if (!refreshTokenResponse.ok) {
			return new Response('Redirect', { status: 303, headers: { Location: '/login' } });
		}

		// Step 3
		const { token: newToken, refreshToken: newRefreshToken } = await refreshTokenResponse.json();

		event.cookies.set('token', newToken);
		event.cookies.set('refreshToken', newRefreshToken);

		event.request.headers.set('Authorization', `Bearer ${newToken}`);
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
