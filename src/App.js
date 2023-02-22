import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MyNavbar from "./Components/MyNavbar";
import Home from "./Pages/Home";
import ListingPage from "./Pages/List";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./App.css";
import Details from "./Pages/Details";
import ViewOrders from "./Pages/ViewOrders";
import ViewOrderDetails from "./Pages/ViewOrderDetails";

function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/list" element={<ListingPage />} />
        <Route path={`/book/view/:bookId`} element={<Details />} />
        <Route path={`/book/orders`} element={<ViewOrders />} />
        <Route path={`/book/orders/:bookId`} element={<ViewOrderDetails />} />
      </Routes>
    </div>
  );
}

export default App;
