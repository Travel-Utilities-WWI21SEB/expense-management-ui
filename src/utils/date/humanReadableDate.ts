export const humanReadableDate = (date: Date, format: string): string => {
	// Get language from local storage
	console.log('humanReadableDate', date, format);
	return new Intl.DateTimeFormat(format, { dateStyle: 'full' }).format(date);
};
