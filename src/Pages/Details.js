import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";

function Details() {
  const params = useParams();
  const firebase = useFirebase();

  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [qntt, setQntt] = useState(1);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((val) => setData(val.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageUrl = data.imgUrl;
      firebase.getImageUrl(imageUrl).then((url) => setUrl(url));
    }
  }, [data]);

  if (data === null) {
    return <h1>Loading...</h1>;
  }

  const placeOrder = async () => {
    await firebase.placeOrder(params.bookId, qntt);
  };

  return (
    <>
      <div className="container mt-5">
        <h1>{data.name}</h1>
        <img src={url} width="50%" style={{ borderRadius: 10 }} />
        <h2>Details</h2>
        <h4>Price: Rs. {data.price} </h4>
        <h4>ISBN Number: {data.isbn} </h4>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control
            type="number"
            value={qntt}
            onChange={(e) => setQntt(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="success" onClick={placeOrder}>
          Buy Now
        </Button>
      </div>
    </>
  );
}

export default Details;
