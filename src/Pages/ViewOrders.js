import React, { useEffect } from "react";
import { useFirebase } from "../Context/Firebase";

function ViewOrders() {
  const firebase = useFirebase();

  useEffect(() => {
    firebase.fetchMyOrders()?.then((books) => console.log(books.docs));
  }, [firebase]);

  return <>Orders</>;
}

export default ViewOrders;
