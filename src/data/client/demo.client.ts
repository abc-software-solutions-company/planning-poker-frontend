import {useRouter} from 'next/router';
import {useInfiniteQuery} from 'react-query';

import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IPagination, IPostsResponse} from '@/types';

import http from '../http';

export function useLoadMore(category?: string) {
  const {locale} = useRouter();
  const {data, isLoading, error, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage} = useInfiniteQuery<
    IPostsResponse,
    Error
  >(
    [API_ENDPOINTS.POST, category, 'client-blog-posts'],
    ({pageParam}) => {
      const params: any = {
        locale,
        populate: {cover: '*', categories: '*'},
        pagination: {
          page: pageParam?.page ?? 1,
          pageSize: pageParam?.pageSize ?? 9
        },
        sort: ['updatedAt:desc']
      };
      if (category) params.filters = {categories: {slug: {$eq: category}}};

      return http.posts.all(params);
    },
    {
      getNextPageParam: res => {
        const {page, pageCount}: IPagination = res.meta.pagination || {};
        return page < pageCount ? {page: page + 1} : undefined;
      }
    }
  );

  function handleLoadMore() {
    fetchNextPage();
  }

  return {
    posts: data?.pages?.flatMap(page => page.data) ?? [],
    isLoading,
    isFetching,
    error,
    isLoadingMore: isFetchingNextPage,
    loadMore: handleLoadMore,
    hasMore: Boolean(hasNextPage)
  };
}
