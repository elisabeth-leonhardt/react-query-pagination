import { useQuery } from "react-query";
import Pagination from "@material-ui/lab/Pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function PaginationPage(props) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { data } = useQuery(
    ["characters", page],
    async () =>
      await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      ).then((result) => result.json()),
    {
      keepPreviousData: true,
    }
  );
  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(`pagination/?page=${value}`, undefined, { shallow: true });
  }
  useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page));
    }
  }, []);
  return (
    <div>
      <h1>Rick and Morty with React Query and Pagination</h1>
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
              height={200}
              loading='lazy'
              width={200}
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
      />
    </div>
  );
}
