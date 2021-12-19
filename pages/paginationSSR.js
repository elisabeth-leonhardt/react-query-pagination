import { useQuery, dehydrate, QueryClient } from "react-query";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import { useRouter } from "next/router";

export default function paginationSSR(props) {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router.query.page) || 1);
  const { data } = useQuery(
    ["characters", page],
    async () =>
      await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      ).then((result) => result.json()),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(`paginationSSR/?page=${value}`, undefined, { shallow: true });
  }
  return (
    <div>
      <h1>
        Rick and Morty with React Query and Pagination - Server Side rendered
      </h1>
      <Pagination
        count={data?.info.pages}
        variant='outlined'
        color='primary'
        className='pagination'
        page={page}
        onChange={handlePaginationChange}
      />
      <div className='grid-container'>
        {data?.results?.map((character) => (
          <article key={character.id}>
            <img
              src={character.image}
              alt={character.name}
              height={250}
              loading='lazy'
              width={"100%"}
            />
            <div className='text'>
              <p>Name: {character.name}</p>
              <p>Lives in: {character.location.name}</p>
              <p>Species: {character.species}</p>
              <i>Id: {character.id} </i>
            </div>
          </article>
        ))}
      </div>
      <Pagination
        count={data?.info.pages}
        variant='outlined'
        color='primary'
        className='pagination'
        page={page}
        onChange={handlePaginationChange}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  let page = 1;
  if (context.query.page) {
    page = parseInt(context.query.page);
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    ["characters", page],
    async () =>
      await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      ).then((result) => result.json())
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
}
