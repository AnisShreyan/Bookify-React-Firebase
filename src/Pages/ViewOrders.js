import React, { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import BookCard from "../Components/Card";
import { useFirebase } from "../Context/Firebase";

function ViewOrders() {
  const firebase = useFirebase();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn)
      firebase
        .fetchMyBooks(firebase.user.uid)
        ?.then((books) => setBooks(books.docs));
  }, [firebase]);

  return (
    <>
      <div className="container">
        <CardGroup style={{ justifyContent: "center" }}>
          {books.map((book, index) => {
            return (
              <BookCard
                key={index}
                id={book.id}
                {...book.data()}
                link={`/book/orders/${book.id}`}
              />
            );
          })}
        </CardGroup>
      </div>
    </>
  );
}

export default ViewOrders;
