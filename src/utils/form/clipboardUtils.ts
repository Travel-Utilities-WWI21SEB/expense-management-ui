import { tokenValues } from '$stores';
import { tick } from 'svelte';

const pasteClipboardData = async (
	verifyToken: () => void,
	clipboardData?: string
): Promise<void> => {
	if (!clipboardData) return;

	// We only want to paste 6 characters
	// If its more than 6, we slice it
	// If its less than 6, we don't do anything
	if (clipboardData.length > 6) {
		clipboardData = clipboardData.slice(0, 6);
	} else if (clipboardData.length < 6) {
		return;
	}

	const inputs = document.querySelectorAll('input[type="text"]');

	// We spread the clipboard data into the array to
	// trigger svelte reactivity
	tokenValues.set(clipboardData.split(''));

	// Focus the last input
	const lastInput = inputs[inputs.length - 1] as HTMLInputElement;
	lastInput.focus();

	await tick();
	verifyToken();
};

const updateTokenValueAtIndex = (index: number, value: string): void => {
	tokenValues.update((tokenValues) => {
		// Create a new array with the updated value at the specified index
		const updatedTokenValues = [...tokenValues];
		updatedTokenValues[index] = value;
		return updatedTokenValues;
	});
};

export const keydownHandler = async (e: KeyboardEvent, verifyToken: () => void): Promise<void> => {
	// If the key is trying to paste something in the first input
	// we get the clipboard data and spread it into the inputs
	const target = e.target as HTMLInputElement;

	if (target.title === 'token1' && e.code === 'KeyV' && (e.ctrlKey || e.metaKey)) {
		// Little hack to get the clipboard data and spread it :)
		const clipboardData = (e as unknown as ClipboardEvent).clipboardData?.getData('text/plain');
		pasteClipboardData(verifyToken, clipboardData);
		return;
	}

	let previousInput: HTMLInputElement;

	switch (e.code) {
		case 'Backspace': {
			previousInput = target.previousElementSibling as HTMLInputElement;

			// If there's a value in the current target
			// we delete it, otherwise we focus the previous input
			if (previousInput && target.selectionStart === 0) {
				previousInput.focus();
			} else {
				const index = Array.from(target.parentElement?.children || []).indexOf(target);
				updateTokenValueAtIndex(index, '');
			}

			e.preventDefault();
			break;
		}
		case 'ArrowLeft': {
			previousInput = target.previousElementSibling as HTMLInputElement;

			if (previousInput && target.selectionStart === 0) {
				previousInput.focus();
			} else {
				target.selectionStart = target.selectionEnd = 0;
			}

			break;
		}
		case 'ArrowRight': {
			const nextInput = target.nextElementSibling as HTMLInputElement;

			if (nextInput && target.selectionStart === target.value.length) {
				nextInput.focus();
			} else {
				target.selectionStart = target.selectionEnd = target.value.length;
			}

			break;
		}
		default: {
			// Check if input is number or letter
			// Write the value and focus the next input
			const validInput = ['Digit', 'Key', 'Numpad'];

			if (validInput.some((input) => e.code.startsWith(input))) {
				// Yet another hack to trigger svelte array reactivity
				// but reduces loc by creating form inputs in a loop
				const index = Array.from(target.parentElement?.children || []).indexOf(target);
				updateTokenValueAtIndex(index, e.key);

				const nextInput = target.nextElementSibling as HTMLInputElement;

				if (nextInput) {
					nextInput.focus();
					e.preventDefault();
				} else {
					// If there's no next input, we verify the token
					// since we're in the last input
					await tick();
					verifyToken();
				}
			}
		}
	}
};

// Handle paste event
export const pasteHandler = (e: ClipboardEvent, verifyToken: () => void): void => {
	e.preventDefault();

	const clipboardData = e.clipboardData?.getData('text/plain');

	pasteClipboardData(verifyToken, clipboardData);
};
