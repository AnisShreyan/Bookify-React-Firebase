import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";

function BookCard(props) {
  const firebase = useFirebase();

  const [url, setUrl] = useState(null);

  useEffect(() => {
    firebase.getImageUrl(props.imgUrl).then((url) => setUrl(url));
  }, []);

  const navigate = useNavigate()

  console.log(props);

  return (
    <>
      <div className="m-2">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={url} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
              <span className="h4">&#8377;{props.price}</span> <br/>
              <span><strong>ISBN: </strong>{props.isbn}</span>
            </Card.Text>
            <Button variant="primary" onClick={e=> navigate(`/book/view/${props.id}`)}>View</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default BookCard;
