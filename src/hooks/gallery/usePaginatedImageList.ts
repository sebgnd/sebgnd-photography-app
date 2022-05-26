import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPaginationNextOffset, selectPaginationPreviousOffset } from 'redux/slices/gallery/gallery.selector';
import { fetchImagesPaginated } from 'redux/slices/gallery/gallery.thunk';
import { actions } from 'redux/slices/gallery/gallery.slice';

export type UsePaginatedImageListConfig = {
  limit: number,
	status: 'valid' | 'processing' | 'all' | 'error',
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
	status = 'all',
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
			status,
      categoryId,
    }));
  }, [dispatch, status, paginationSettings, nextOffset]);

  const fetchPreviousPage = useCallback((categoryId?: string) => {
    dispatch(fetchImagesPaginated({
      ...paginationSettings,
      offset: previousOffset,
			status,
      categoryId,
    }));
  }, [dispatch, status, paginationSettings, previousOffset]);

  const fetchFromScratch = useCallback((categoryId?: string) => {
    dispatch(actions.clearImageList());
    dispatch(fetchImagesPaginated({
      ...paginationSettings,
			status,
      offset: 0,
      categoryId,
    }));
  }, [dispatch, status, paginationSettings]);

  useEffect(() => {
    dispatch(actions.clearImageList());
    
    if (fetchOnMount) {
      dispatch(fetchImagesPaginated({
        resetList: false,
				status,
        offset: 0,
        limit,
      }));
    }
  }, [dispatch, status, limit, fetchOnMount])

  return { fetchNextPage, fetchPreviousPage, fetchFromScratch };
};
