export type ToUrlNavigationItem = {
	url: string,
	name: string,
}

export type ActionNavigationItem = {
	name: string,
	onClick: () => void,
}

export type NavigationBarItem = ToUrlNavigationItem | ActionNavigationItem;

export type NavigationLogoItem = {
	src: string,
	url: string,
}

export type NavigationBarClassNames = {
	container?: string,
	layout?: string,
}
