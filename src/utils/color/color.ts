export function pickTextColorBasedOnBgColorSimple(
	bgColor: string,
	lightColor: string,
	darkColor: string
): string {
	const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
	const red = parseInt(color.substring(0, 2), 16); // hexToR
	const green = parseInt(color.substring(2, 4), 16); // hexToG
	const blue = parseInt(color.substring(4, 6), 16); // hexToB
	return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? darkColor : lightColor;
}
