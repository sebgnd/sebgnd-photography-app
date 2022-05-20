import { useCallback, useEffect } from 'react';
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
  fetchNextPage: () => void,
  fetchPreviousPage: () => void,
}

export const usePaginatedImageList: UsePaginatedList = ({
  limit,
  fetchOnMount = false,
  resetListOnFetch = false,
}) => {
  const dispatch = useDispatch();

  const currentOffset = useSelector(selectPaginationOffset);

  const fetchNextPage = useCallback(() => {
    dispatch(fetchImagesPaginated({
      offset: currentOffset + limit,
      resetList: resetListOnFetch,
      limit,
    }));
  }, [dispatch, limit, resetListOnFetch, currentOffset]);

  const fetchPreviousPage = useCallback(() => {
    dispatch(fetchImagesPaginated({
      offset: currentOffset - limit,
      resetList: resetListOnFetch,
      limit,
    }));
  }, [dispatch, limit, resetListOnFetch, currentOffset]);

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

  return { fetchNextPage, fetchPreviousPage };
};
