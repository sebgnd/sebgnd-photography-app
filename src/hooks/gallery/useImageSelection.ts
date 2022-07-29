import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from 'redux/store';

import { actions } from 'redux/slices/gallery/gallery.slice';
import { fetchImage } from 'redux/slices/gallery/gallery.thunk';
import { selectSelectedImage } from 'redux/slices/gallery/gallery.selector';

import { useScrolling } from '../useScrolling';

export const useImageSelection = (urlParam: string = 'image') => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useSearchParams();
  const [, setScroll] = useScrolling();

  const selectedImage = useSelector(selectSelectedImage);

  const resetSelection = useCallback(() => {
    dispatch(actions.clearImageSelection());
    setScroll(true);
    setSearch({});
  }, [dispatch, setScroll, setSearch]);

  const selectImage = useCallback((imageId: string) => {
    setSearch({ [urlParam]: imageId });
  }, [urlParam, setSearch]);

  useEffect(() => {
    const imageId = search.get(urlParam);

    if (imageId) {
      setScroll(false);
      dispatch(fetchImage(imageId));
    }
  }, [search, dispatch, urlParam, setScroll]);

  return {
    selection: selectedImage,
    resetSelection,
    selectImage,
  };
};
