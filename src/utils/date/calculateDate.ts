export function calculateDate(date: Date): string {
	return new Intl.DateTimeFormat('de-de').format(date);
}
