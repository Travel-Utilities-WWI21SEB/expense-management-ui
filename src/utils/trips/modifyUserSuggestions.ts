import type { User } from '$userDomain';

interface Suggestions {
	label: string;
	value: string;
}

export function modifyUserSuggestions(users: Array<User>) {
	let suggestions: Array<Suggestions>;
	if (users) {
		suggestions = users.map((user) => {
			return { label: user.username, value: user.username };
		});
	} else {
		suggestions = [];
	}
	return suggestions;
}
