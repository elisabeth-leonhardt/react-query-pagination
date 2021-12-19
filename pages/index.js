import Link from "next/link";

export default function Home(props) {
  return (
    <div id='welcome'>
      <h1>Explore how I implemented pagination:</h1>
      <h2>Client side pagination:</h2>
      <a href='https://dev.to/elisabethleonhardt/implementing-pagination-with-nextjs-mui-and-react-query-2ab'>
        Read the Article
      </a>
      <Link href='/paginationCSR'>
        <a>See it working</a>
      </Link>{" "}
      <a href='https://github.com/elisabeth-leonhardt/react-query-pagination/tree/main/pages'>
        See the code
      </a>
      <h2>Server side pagination:</h2>
      <a href='https://dev.to/elisabethleonhardt/'>Read the Article</a>
      <Link href='/paginationSSR'>
        <a>See it working</a>
      </Link>{" "}
      <a href='https://github.com/elisabeth-leonhardt/react-query-pagination/tree/main/pages'>
        See the code
      </a>
    </div>
  );
}
