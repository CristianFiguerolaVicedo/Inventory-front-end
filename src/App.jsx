import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Sale from "./pages/Sale";

const App = () => {
  return(
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}/>
          <Route path="/product" element={<Product />}/>
          <Route path="/category" element={<Category />}/>
          <Route path="/sale" element={<Sale />}/>
          <Route path="/filter" element={<Filter />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/product" />
  ) : (
    <Navigate to="/login" />
  )
}

export default App;