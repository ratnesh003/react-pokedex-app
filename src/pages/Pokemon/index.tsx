import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRef, useCallback, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { limit } from '@/constants/index.js';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const fetchPokemon = async (pageParam = 0, queryKey: string[]): Promise<any> => {
  let response: AxiosResponse;

  try {
    response = await axios.get(`https://pokeapi.co/api/v2/${queryKey[0]}?limit=${limit}&offset=${pageParam}`);

    const resultsWithDetails = await Promise.all(
      response.data.results.map(async (pokemon: any) => {
        const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        return { ...pokemon, details: data.data };
      }),
    );

    return {
      results: resultsWithDetails,
      nextOffset: pageParam + limit,
      hasNextPage: response.data.next !== null,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      results: [],
      nextOffset: pageParam + limit,
      hasNextPage: false,
    };
  }
};

const Pokemon = () => {
  const location = useLocation();

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
    queryFn: async (lastPage) => await fetchPokemon(lastPage.pageParam, ['pokemon']),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextOffset : undefined),
    staleTime: Infinity,
  });

  const { data, isFetched } = useQuery({
    queryKey: ['types'],
    queryFn: async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/type?limit=25`);
      return {
        result: response.data,
      };
    },
  });

  const observer = useRef<IntersectionObserver>();
  const [mobileViewPageOpen, setMobileViewPageOpen] = useState(false);

  function HandleMobileViewClick() {
    if (window.innerWidth < 768) {
      setMobileViewPageOpen(!mobileViewPageOpen);
    }
  }

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
    <main className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div
          className={cn(
            'w-full h-full flex flex-wrap gap-x-7 gap-y-24 px-6 items-center  justify-center md:justify-end md:col-span-2 pt-20',
            mobileViewPageOpen ? 'hidden' : '',
          )}
        >
          <div className="w-full  h-9 md:w-[584px] lg:w-[776px] ml-10 lg:ml-0 flex gap-5 justify-center items-center">
            <Input placeholder="search" />

            <Select
            // onValueChange={(e) => {
            //   handleChange(e);
            // }}
            // defaultValue=""
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {isFetched &&
                  data?.result.results.map((type: any, index: number) => (
                    <SelectItem value={type.name} key={index}>
                      {type.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button onClick={() => {}} className="p-2">
              <Trash2 size={18} strokeWidth={2} />
            </Button>
          </div>

          {result.data?.pages.map((page: any, pageIndex) =>
            page.results.map((pokemon: any, index: number) => {
              const isLastPokemon = page.results.length === index + 1;
              const tempIdx = pageIndex * limit + index + 1;
              const imageNum = tempIdx <= 1025 ? tempIdx : 10000 + (pageIndex - 41) * limit + index + 1;
              return (
                <Link
                  key={pokemon.name}
                  ref={isLastPokemon ? lastPokemonRef : null}
                  className="w-36 md:w-44 lg:w-60 p-3 pt-8 border-primary/70 border-2 rounded-xl shadow-md hover:shadow-lg flex flex-col items-center justify-start hover:cursor-pointer"
                  to={`/pokemon/${pokemon.name}`}
                  onClick={HandleMobileViewClick}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageNum}.png`}
                    className="render-pixel absolute h-20 w-20 scale-150 -translate-y-20"
                    alt={pokemon.name}
                  />
                  <h2 className="text-sm text-primary/60 font-bold pt-2 text-center truncate">N° {tempIdx}</h2>
                  <h1 className="text-xl text-secondary-foreground tracking-tight font-semibold leading-5 truncate w-full text-center px-5">
                    {pokemon.name}
                  </h1>
                  <div className="w-full h-full flex flex-wrap items-center justify-center gap-2.5 p-2">
                    {pokemon.details.types.map((type: any) => (
                      <Badge variant={type.type.name} key={type.type.name}>
                        {type.type.name}
                      </Badge>
                    ))}
                  </div>
                </Link>
              );
            }),
          )}
          {isFetchingNextPage && <p className="text-center content-center w-full">Loading...</p>}
        </div>
        <div className={cn('md:block w-full', !mobileViewPageOpen ? 'hidden' : '')}>
          <div className="sticky top-16 right-0">
            <Link
              to={'/pokemon'}
              className={cn('absolute right-0 top-0', location.pathname === '/pokemon' ? 'hidden' : '')}
              onClick={HandleMobileViewClick}
            >
              <Button variant={'nav'}>
                <X size={20} />
              </Button>
            </Link>
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pokemon;
