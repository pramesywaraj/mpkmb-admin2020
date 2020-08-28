export function parseDate(date) {
	let parsedDate = new Date(parseInt(date)).toISOString().split('T')[0];
	return parsedDate;
}
