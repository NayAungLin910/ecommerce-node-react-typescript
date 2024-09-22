import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/products/:category" Component={ProductList} />
        <Route path="/product/:id" Component={Product} />
        <Route path="/cart" Component={Cart} />
        <Route path="/success" Component={Success} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
