import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const list = [
  { name: "Home", path: "/" },
  { name: "Location", path: "/location" },
  { name: "Fight", path: "/fight" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("myToken");
  const username = localStorage.getItem("username");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle Scroll to detect the position
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("myToken");
    localStorage.removeItem("my-pokemon");
    localStorage.removeItem("enemy-pokemon");
    alert("You Logged Out");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Navbar with dynamic background color */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-5 md:flex-row transition-colors duration-300 ${scrollPosition > 0 ? "bg-blue-50 shadow-md" : "bg-transparent"
          }`}
      >
        <Link to="/">
          <img
            src="/images/pokemon.png"
            alt="Pokemon Logo"
            width={170}
            className="duration-200 ease-in-out hover:scale-110"
          />
        </Link>

        {/* Hamburger Menu for small screens */}
        <div className="md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Links for Desktop and Mobile */}
        <ul
          className={`absolute mt-14 top-16 left-0 right-0 p-5 bg-blue-50  shadow-md rounded-lg md:relative md:top-0 md:left-auto md:right-auto md:bg-transparent md:flex md:p-0 md:shadow-none md:rounded-none ${isMenuOpen ? "block transition transform ease-in" : "hidden"
            } md:flex items-center justify-center w-full md:gap-6`}
        >
          {list.map((item, index) => (
            <li key={index} className="text-center md:mx-4">
              <Link
                to={item.path}
                className="relative inline-block text-xl font-bold text-transparent transition transform scale-100 bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 hover:scale-110 active:text-blue-400"
                onClick={() => setIsMenuOpen(false)} // close menu on click
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login/Logout Button for Desktop */}
        <div className="items-center hidden md:flex">
          {!token ? (
            <button
              className="px-4 py-2 ml-4 font-bold text-white bg-blue-400 rounded-lg hover:bg-blue-300"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          ) : (
            <div className="flex items-center">
              <h3 className="mr-4 font-bold">{`Halo, ${username}`}</h3>
              <button
                onClick={handleLogout}
                className="px-4 py-2 font-bold text-white bg-red-300 rounded-lg hover:bg-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile login/logout button */}
        <div
          className={`md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md ${isMenuOpen ? "block" : "hidden"
            }`}
        >
          {!token ? (
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-400 rounded-lg hover:bg-blue-300"
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
            >
              Login
            </button>
          ) : (
            <div className="text-center">
              <h3 className="mb-2 font-bold">{`Halo, ${username}`}</h3>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 font-bold text-white bg-red-300 rounded-lg hover:bg-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Padding for the fixed navbar */}
      <div className="pt-20">
      </div>
    </>
  );
};

export default NavBar;
