import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { actions } from 'redux/slices/gallery/gallery.slice';
import { fetchImage } from 'redux/slices/gallery/gallery.thunk';
import { selectSelectedImage } from 'redux/slices/gallery/gallery.selector';

import { useScrolling } from './useScrolling';

export const useImageSelection = (urlParam: string = 'image') => {
	const dispatch = useDispatch();

	const [search, setSearch] = useSearchParams();
	const [, setScroll] = useScrolling();

	const selectedImage = useSelector(selectSelectedImage);

	const resetSelection = useCallback(() => {
		dispatch(actions.clearImageSelection());
		setScroll(true);
		setSearch({});
	}, []);

	const selectImage = useCallback((imageId: string) => {
		setSearch({ [urlParam]: imageId });
	}, []);

	useEffect(() => {
		const imageId = search.get(urlParam);

		if (imageId) {
			setScroll(false);
			dispatch(fetchImage(imageId));
		}
	}, [search, dispatch]);

	return {
		selection: selectedImage,
		resetSelection, 
		selectImage,
	};
}