import styles from "../styles/Home.module.css";
import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Home() {
  function handlePaginationChange(e, value) {
    console.log("clicked the pagination!", value);
  }

  // const [page, setPage] = useState(1);

  const { data, status, error } = useQuery(
    "characters",
    async () =>
      await fetch("https://rickandmortyapi.com/api/character").then((result) =>
        result.json()
      )
  );
  console.log(data);

  return (
    <div>
      <h1>Rick and Morty with React Query and Pagination</h1>
      <Pagination
        count={10}
        variant='outlined'
        color='primary'
        onChange={handlePaginationChange}
        className='pagination'
      />
      {error && <p>{error}</p>}
      <div className='grid-container'>
        {data.results?.map((character, index) => (
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
              <i>card number: {index} </i>
            </div>
          </article>
        ))}
      </div>
      <Pagination
        count={10}
        variant='outlined'
        color='primary'
        onChange={handlePaginationChange}
        className='pagination'
      />
    </div>
  );
}
