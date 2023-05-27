export function validateUsername(username: string): boolean {
	return username.length >= 4 && username.length <= 15;
}
