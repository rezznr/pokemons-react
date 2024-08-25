import Pages from "./page/Homepage.jsx";
import React from "react";
import Location from "./page/Location.jsx";
import AreaPokemons from "./page/AreaPokemons.jsx";
import Login from "./page/Login.jsx";
import Fight from "./page/Fight.jsx";
import ProtectedRoute from "./page/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pages />} />
      <Route path="/login" element={<Login />} />
      <Route path="/location">
        <Route index element={<ProtectedRoute component={Location} />} />
        <Route
          path=":id"
          element={<ProtectedRoute component={AreaPokemons} />}
        />
      </Route>
      <Route path="/fight" element={<ProtectedRoute component={Fight} />} />
    </Routes>
  );
}

export default App;
