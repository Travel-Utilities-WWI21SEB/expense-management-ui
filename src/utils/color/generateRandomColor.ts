export function generateRandomColor(numOfSteps: number, step: number, alpha = 0.3): string {
	let red, green, blue;
	const hue = step / numOfSteps;
	const sector = Math.floor(hue * 6);
	const fraction = hue * 6 - sector;
	const complement = 1 - fraction;

	switch (sector % 6) {
		case 0:
			red = 1;
			green = fraction;
			blue = 0;
			break;
		case 1:
			red = complement;
			green = 1;
			blue = 0;
			break;
		case 2:
			red = 0;
			green = 1;
			blue = fraction;
			break;
		case 3:
			red = 0;
			green = complement;
			blue = 1;
			break;
		case 4:
			red = fraction;
			green = 0;
			blue = 1;
			break;
		case 5:
			red = 1;
			green = 0;
			blue = complement;
			break;
		default:
			red = 0;
			green = 0;
			blue = 0;
	}

	return `rgba(${Math.floor(red * 255)}, ${Math.floor(green * 255)}, ${Math.floor(
		blue * 255
	)}, ${alpha})`;
}
