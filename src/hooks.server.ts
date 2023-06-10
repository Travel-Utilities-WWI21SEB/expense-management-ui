import { PUBLIC_BASE_URL } from '$env/static/public';
import type { Handle, HandleFetch } from '@sveltejs/kit';
import { tokenExpired } from './utils/token/tokenExpired';

const unauthorizedRoutes = [
	'/', // Home page
	'/login', // Login page
	'/api/users/login', // Login API
	'/api/users/logout', // Logout API
	'/api/users/resend-token', // Resend token API
	'/api/users/refresh-token', // Refresh token API
	'/api/users/verify-email', // Verify email API
	'/api/users/verify-username', // Verify username API
	'/api/users/register', // Register API
	'/api/users/activate', // Activate API
	'/api/users/forgot-password', // Forgot password API
	'api/users/verify-reset-token', // Verify reset token API
	'api/users/reset-password' // Reset password API
];

export const handle = (async ({ event, resolve }) => {
	console.log(event.url.pathname + ', ' + Date.now());

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
	let token = event.cookies.get('token');
	if (token && !tokenExpired(token)) {
		event.request.headers.set('Authorization', `Bearer ${token}`);
		const response = await resolve(event);

		return response;
	}

	// Step 2
	const refreshToken = event.cookies.get('refreshToken');
	if (refreshToken && !tokenExpired(refreshToken)) {
		const refreshTokenResponse = await fetch(`${PUBLIC_BASE_URL}/api/v1/users/refresh`, {
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

		event.cookies.set('token', newToken, { path: '/' });
		event.cookies.set('refreshToken', newRefreshToken, { path: '/' });

		token = newToken;
	}

	event.request.headers.set('Authorization', `Bearer ${token}`);
	const response = await resolve(event);

	return response;
}) satisfies Handle;

// By default SvelteKit does not send the Authorization header to the API
// since it is not a same-origin request. This hook will add the Authorization
// header to the request if the request is going to the API. (rip 1 hour of my time)
export const handleFetch = (async ({ event, request, fetch }) => {
	const url = new URL(request.url);

	if (PUBLIC_BASE_URL === url.origin) {
		request.headers.set('Authorization', event.request.headers.get('Authorization') || '');
	}

	return fetch(request);
}) satisfies HandleFetch;