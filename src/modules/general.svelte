<script context="module" lang="ts">
	export function calculateDate(date: Date) {
		const yyyy = date.getFullYear();
		let mm: number | string = date.getMonth() + 1; // Months start at 0!
		let dd: number | string = date.getDate();

		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm.toString();
		}

		return dd + '.' + mm + '.' + yyyy;
	}
</script>
