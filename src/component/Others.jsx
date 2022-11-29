// import { Pokemon } from './../data/pokemon';

export const Button = ({ onClick }) => {
  return (
    <button className="rounded bg-indigo-500 text-white p-4 w-full" onClick={onClick}>
      Pilih pokemon
    </button>
  );
};

export const Image = ({ src, size }) => {
  return (
    <img src={src} alt="img" className={`my-4 mx-auto ${size === 'big' ? 'h-64' : 'h-32'}`} />
  );
}

export const NameP = ({ nama }) => {
  return <p className="font-bold text-xl mb-2 text-center">{nama}</p>;
};

export const PokemonOthers = ({ children }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      {children}
    </div>
  )
}

export const ContainerBody = ({ children }) => {
  return <div className="p-6">{children}</div>
}