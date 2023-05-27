export function validatePasswordsMatch(password: string, verifyPassword: string): boolean {
	return password === verifyPassword && password.length > 0;
}
