import React, { useEffect, useState } from "react";
import BookCard from "../Components/Card";
import { useFirebase } from "../Context/Firebase";
import CardGroup from "react-bootstrap/CardGroup";

function Home() {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((docs) => setBooks(docs.docs));
  }, []);

  return (
    <div className="container mt-5">
      <CardGroup>
        {books.map((book, key) => (
          <BookCard key={key} {...book.data()} />
        ))}
      </CardGroup>
    </div>
  );
}

export default Home;
