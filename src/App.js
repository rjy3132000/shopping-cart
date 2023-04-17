import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/App.css"
import Cart from "./component/Cart";
import Header from "./component/Header";
import Home from "./component/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
        <div>
          <Routes>
            <Route path="/" exact element={<Home />}/>
            <Route path="/cart" element={<Cart />}/>
          </Routes>
        </div>
    </BrowserRouter> 
  );
}

export default App;
