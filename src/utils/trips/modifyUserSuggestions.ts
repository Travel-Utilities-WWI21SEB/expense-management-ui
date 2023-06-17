import type { User } from '$userDomain';

export function modifyUserSuggestions(users: Array<User>) {
	let suggestions: Array<any>;
	if (users) {
		suggestions = users.map((user) => {
			return { label: user.username, value: user.username };
		});
	} else {
		suggestions = [];
	}
	return suggestions;
}
