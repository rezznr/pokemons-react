import { useNavigate, Link } from "react-router-dom";
import React from "react";

const list = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Location",
    path: "/location",
  },
  {
    name: "Fight",
    path: "/fight",
  },
];

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("myToken");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("myToken");
    localStorage.removeItem("my-pokemon");
    localStorage.removeItem("enemy-pokemon");

    alert("You Logged Out");
    navigate("/");
  };

  return (
    <nav className="relative flex flex-row items-center justify-center mb-8">
      <Link to="/">
        <img
          src="/images/pokemon.png"
          alt="Pokemon Logo"
          width={170}
          className="ml-10 duration-200 ease-in-out scale-100 hover:scale-110 "
        />
      </Link>
      <ul className="flex items-center justify-center w-full">
        <li className="flex gap-6">
          {list.map((list, index) => (
            <Link
              key={index}
              to={list.path}
              className="relative inline-block text-3xl font-bold text-transparent transition transform scale-100 bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 hover:scale-110 active:text-blue-400"
            >
              {list.name}
            </Link>
          ))}
        </li>
      </ul>
      {!token ? (
        <button
          className="px-4 py-4 font-bold text-white transition transform bg-blue-400 rounded-lg hover:bg-blue-300 hover:scale-105"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      ) : (
        <div className="flex ">
          <h3 className="flex mt-4 mr-4 font-bold">{`Halo, ${username}`}</h3>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-10 py-2 m-2 font-bold text-center text-white bg-red-300 rounded shadow-xl hover:bg-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </nav>

  );
};

export default NavBar;
