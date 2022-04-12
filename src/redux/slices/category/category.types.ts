import { EntityState } from '@reduxjs/toolkit';

export type FetchAllCategoriesResponse = {
	items: ReadonlyArray<{
		id: string,
		createdAt: string,
		updatedAt: string,
		displayName: string,
		name: string,
		thumbnail: {
			id: string,
		},
	}>,
}

export type CategoryItem = {
	id: string,
	name: string,
	displayName: string,
	thumbnailId: string,
}

export type CategoryState = {
	list: {
		items: EntityState<CategoryItem>,
		loading: boolean,
	},
};
