import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useCallback } from 'react';
import axios from 'axios';
import { limit } from '@/constants';
import { Outlet } from 'react-router-dom';
// import debounce from 'lodash.debounce';

const fetchPokemon = async (pageParam = 0, queryKey: string[]): Promise<any> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/${queryKey[0]}?limit=${limit}&offset=${pageParam}`);
  return {
    results: response.data.results,
    nextOffset: pageParam + limit,
    hasNextPage: response.data.next !== null,
  };
};

const Pokemon = () => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    promise,
    ...result
  } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: (lastPage) => fetchPokemon(lastPage.pageParam, ['pokemon']),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextOffset : undefined),
    staleTime: 20000,
  });

  const observer = useRef<IntersectionObserver>();

  const lastPokemonRef = useCallback(
    (node: any) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  if (result.isError) return <p>Error: {(result.error as Error).message}</p>;

  return (
    <main className="w-full border border-red-500">
      <div className="grid grid-cols-auto md:grid-cols-3">
        <div className="w-full h-full flex flex-wrap gap-10 items-center justify-center border border-red-500 md:col-span-2">
          {result.data?.pages.map((page: any, pageIndex) =>
            page.results.map((pokemon: any, index: number) => {
              const isLastPokemon = page.results.length === index + 1;
              return (
                <div
                  key={pokemon.name}
                  ref={isLastPokemon ? lastPokemonRef : null}
                  className="w-1/4 border border-red-500"
                >
                  <p>
                    {pageIndex * limit + index + 1} {pokemon.name}
                  </p>
                </div>
              );
            }),
          )}
          {isFetchingNextPage && <p className='text-center content-center w-full'>Loading...</p>}
        </div>
        <Outlet />
      </div>
    </main>
  );
};

export default Pokemon;
