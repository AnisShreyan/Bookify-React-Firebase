import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../Context/Firebase";

function BookCard(props) {
  const firebase = useFirebase();

  const [url, setUrl] = useState(null);

  useEffect(() => {
    firebase.getImageUrl(props.imgUrl).then((url) => setUrl(url));
  }, []);

  console.log(url);

  return (
    <>
      <div className="mx-2">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={url} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default BookCard;
