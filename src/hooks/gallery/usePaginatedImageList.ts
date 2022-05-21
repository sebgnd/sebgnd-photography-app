import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPaginationOffset } from 'redux/slices/gallery/gallery.selector';
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

  const currentOffset = useSelector(selectPaginationOffset);

  const paginationSettings = useMemo(() => {
    return {
      resetList: resetListOnFetch,
      limit,
    };
  }, [resetListOnFetch, limit])

  const fetchNextPage = useCallback((categoryId?: string) => {
    dispatch(fetchImagesPaginated({
      ...paginationSettings,
      offset: currentOffset + limit,
      categoryId,
    }));
  }, [dispatch, paginationSettings, limit, currentOffset]);

  const fetchPreviousPage = useCallback((categoryId?: string) => {
    dispatch(fetchImagesPaginated({
      ...paginationSettings,
      offset: currentOffset - limit,
      categoryId,
    }));
  }, [dispatch, limit, paginationSettings, currentOffset]);

  const fetchFromScratch = useCallback((categoryId?: string) => {
    dispatch(actions.clearImageList());
    dispatch(fetchImagesPaginated({
      resetList: resetListOnFetch,
      offset: 0,
      categoryId,
      limit,
    }));
  }, [dispatch, limit, resetListOnFetch]);

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
