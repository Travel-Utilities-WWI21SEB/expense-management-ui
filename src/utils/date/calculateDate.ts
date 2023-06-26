export function calculateDate(date: Date): string {
	return new Intl.DateTimeFormat('de-de').format(date);
}

export function calculateTomorrowForInputFormat(date: string): string {
	return calculateTomorrow(new Date(date)).toISOString().slice(0, 10);
}

function calculateTomorrow(date: Date): Date {
	const tomorrow = new Date(date);
	tomorrow.setDate(tomorrow.getDate() + 1);
	return tomorrow;
}

export function isEndDateAfterStartDate(startDate: string, endDate: string | undefined): boolean {
	if (!endDate) return false;
	const startDateAsDate = new Date(startDate);
	const endDateAsDate = new Date(endDate);
	return startDateAsDate < endDateAsDate;
}
