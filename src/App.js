import Pages from "./page/Homepage.jsx";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Location from "./page/Location.jsx";
import AreaPokemons from "./page/AreaPokemons.jsx";
import Login from "./page/Login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/location">
        <Route index element={<Location />} />
        <Route path=":id" element={<AreaPokemons />} />
      </Route>
    </Routes>
  );
}

export default App;
