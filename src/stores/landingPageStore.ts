import { writable } from 'svelte/store';

// Utility variables
export const errorMessage = writable('');
export const errorState = writable(false);
export const loading = writable(false);

// Token variables
export const tokenValues = writable(['', '', '', '', '', '']);
export const correctToken = writable<boolean | undefined>();
export const tokenErrorState = writable(false);

// Token timer variables
interface Timer {
	running: boolean;
	startedAt: number | null;
	elapsedSeconds: number | null;
	_interval: NodeJS.Timeout | null;
}

export const timer = writable<Timer>({
	running: false,
	startedAt: null,
	elapsedSeconds: null,
	_interval: null
});

export const startTimer = () => {
	timer.set({
		running: true,
		startedAt: Date.now(),
		elapsedSeconds: 0,
		_interval: setInterval(() => {
			timer.update((t) => {
				return {
					...t,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					elapsedSeconds: Math.floor((Date.now() - t.startedAt!) / 1000)
				};
			});
		}, 1000) // accurate to 1/10th of a second
	});
};

export const stopTimer = () => {
	timer.set({
		running: false,
		startedAt: null,
		elapsedSeconds: null,
		_interval: null
	});
};

// Username variables
export const username = writable('');
export const usernameValid = writable(false);

// Email variables
export const email = writable('');
export const emailValid = writable(false);

// Password variables
export const password = writable('');
export const passwordValid = writable(false);
export const passwordsMatch = writable(false);

// Activate account variables
export const notActivatedAlert = writable(false);
export const notActivatedWorkflow = writable(false);
