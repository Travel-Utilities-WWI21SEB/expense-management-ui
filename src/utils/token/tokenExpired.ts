import jwtDecode from 'jwt-decode';

export function tokenExpired(token: string) {
	const decodedToken: any = jwtDecode(token);
	const currentTime = Math.floor(Date.now() / 1000);

	return decodedToken && decodedToken.exp < currentTime;
}
