import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (({ cookies }) => {
	// Delete the token and refresh token
	cookies.delete('token', { path: '/' });
	cookies.delete('refreshToken', { path: '/' });

	// Redirect to home page
	return json({ success: true });
}) satisfies RequestHandler;
