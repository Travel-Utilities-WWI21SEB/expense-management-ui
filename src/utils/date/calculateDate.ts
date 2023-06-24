export function calculateDate(date: string): string {
	return new Intl.DateTimeFormat('de-de').format(new Date(date))
}
