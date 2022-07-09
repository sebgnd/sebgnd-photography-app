export type NavigationBarItem = {
	url: string,
	name: string,
};

export type NavigationLogoItem = {
	src: string,
	url: string,
}

export type NavigationBarAction = {
	name: string,
	handler: () => void,
};

export type NavigationBarClassNames = {
	container?: string,
	layout?: string,
}
