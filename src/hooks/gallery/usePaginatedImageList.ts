import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPaginationNextOffset, selectPaginationPreviousOffset } from 'redux/slices/gallery/gallery.selector';
import { fetchImagesPaginated } from 'redux/slices/gallery/gallery.thunk';
import { actions } from 'redux/slices/gallery/gallery.slice';

export type UsePaginatedImageListConfig = {
  limit: number,
  fetchOnMount?: boolean,
  resetListOnFetch?: boolean,
};

export type UsePaginatedList = (config: UsePaginatedImageListConfig) => {
  fetchNextPage: (categoryId?: string) => void,
  fetchPreviousPage: (categoryId?: string) => void,
  fetchFromScratch: (categoryId?: string) => void,
}

export const usePaginatedImageList: UsePaginatedList = ({
  limit,
  fetchOnMount = false,
  resetListOnFetch = false,
}) => {
  const dispatch = useDispatch();

  const nextOffset = useSelector(selectPaginationNextOffset);
  const previousOffset = useSelector(selectPaginationPreviousOffset);

  const paginationSettings = useMemo(() => {
    return {
      resetList: resetListOnFetch,
      limit,
    };
  }, [resetListOnFetch, limit])

  const fetchNextPage = useCallback((categoryId?: string) => {
    dispatch(fetchImagesPaginated({
      ...paginationSettings,
      offset: nextOffset,
      categoryId,
    }));
  }, [dispatch, paginationSettings, nextOffset]);

  const fetchPreviousPage = useCallback((categoryId?: string) => {
    dispatch(fetchImagesPaginated({
      ...paginationSettings,
      offset: previousOffset,
      categoryId,
    }));
  }, [dispatch, paginationSettings, previousOffset]);

  const fetchFromScratch = useCallback((categoryId?: string) => {
    dispatch(actions.clearImageList());
    dispatch(fetchImagesPaginated({
      ...paginationSettings,
      offset: 0,
      categoryId,
    }));
  }, [dispatch, paginationSettings]);

  useEffect(() => {
    dispatch(actions.clearImageList());
    
    if (fetchOnMount) {
      dispatch(fetchImagesPaginated({
        resetList: false,
        offset: 0,
        limit,
      }));
    }
  }, [dispatch, limit, fetchOnMount])

  return { fetchNextPage, fetchPreviousPage, fetchFromScratch };
};
