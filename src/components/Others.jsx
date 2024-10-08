import React from 'react';
import NavBar from './Navbar';

export const ButtonToLocation = ({ onClick }) => (
  <button className="p-4 text-white bg-indigo-500 rounded" onClick={onClick}>
    Location
  </button>
);

export const ButtonLocation = ({ onClick }) => (
  <button className="w-full p-4 text-white bg-indigo-500 rounded" onClick={onClick}>
    Pilih Area
  </button>
);

export const Image = ({ src }) => (
  <img
    src={src}
    alt="img"
    className={`px-5 py-8 h-60 w-60 text-center`}
  />
);

export const NameP = ({ nama }) => (
  <p className="mb-2 font-mono text-xl font-bold text-center capitalize">
    {nama}
  </p>
);

export const PokemonOthers = ({ children, onClick }) => (
  <div
    className="max-w-2xl p-4 overflow-hidden duration-500 ease-in-out transform rounded shadow-lg cursor-pointer hover:scale-110"
    onClick={onClick}
  >
    {children}
  </div>
);

export const ContainerBody = ({ children, flex }) => (
  <div className="bg-gradient-to-tr from-blue-50 to-green-100">
    <NavBar />
    <div className={`flex items-center justify-center py-8 pt-20 ${flex === 'col' ? "flex-col" : "flex-row"}`}>
      {children}
    </div>
  </div>
);
