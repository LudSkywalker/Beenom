export default () => {
	const mothsList = Array.from({ length: 12 }, (_, index) =>
		(index + 1).toString()
	);
	const yearsList = Array.from({ length: 21 }, (_, index) =>
		(index + new Date().getFullYear()).toString()
	);
	return [mothsList, yearsList];
};
