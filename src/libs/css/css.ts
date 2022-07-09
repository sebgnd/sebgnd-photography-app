export const combineClasses = (...classes: (string | undefined)[]) => {
	return classes
		.filter((className) => className !== undefined)
		.join(' ');
};
