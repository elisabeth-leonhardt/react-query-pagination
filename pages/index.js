import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import { useQuery } from "react-query";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home(props) {
  console.log(props);
  const router = useRouter();
  console.log(parseInt(router.query.page));
  const [page, setPage] = useState(parseInt(router.query.page) || 1);
  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(`/?page=${value}`, undefined, { shallow: true });
  }
  // configure the pagination (basic)
  //1. set the page into state and link it up with your API call
  //2. in data.info, there is the amount of pages. link this to the pagination component
  //3. set the current page in state to the current page in the pagination componetn
  //4. update it every time somebody clicks on the pagination
  //5. to avoid flicker of the pagination component, set keepPreviousData to true
  // configure advanced features
  //6. add the shallow routing so your route get's updated when yo navigate
  //7. read the router.query.page param into state
  //8. notice it doesn't really work! (ups)
  //9 configure SSR

  const { data, status, error } = useQuery(
    ["characters", page],
    async () =>
      await fetch(
        `https://rickandmortyapi.com/api/character/?page=${page}`
      ).then((result) => result.json()),
    {
      keepPreviousData: true,
      initialData: props.data,
    }
  );
  console.log(page);
  return (
    <div>
      <h1>Rick and Morty with React Query and Pagination</h1>
      <Pagination
        count={data?.info.pages}
        variant='outlined'
        color='primary'
        onChange={handlePaginationChange}
        className='pagination'
        page={page}
      />
      {error && <p>{error}</p>}
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
        count={data?.info.pages || 0}
        variant='outlined'
        color='primary'
        onChange={handlePaginationChange}
        className='pagination'
        page={page}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const pageParam = context.query?.page;
  console.log(pageParam);
  try {
    const data = await fetch(
      `https://rickandmortyapi.com/api/character?page=${pageParam}`
    ).then((res) => res.json());
    return { props: { data } };
  } catch (e) {
    console.log(e);
  }
}
