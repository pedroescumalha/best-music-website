import { FC } from "react";

const NavBar: FC = () => {
  return (
    <header className="flex justify-center pt-5">
      <nav className="w-11/12 bg-white px-6 py-3 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-4xl font-extrabold tracking-wide">Escumalha</h1>
        </div>
        <div className="text-end">
          <p>bio</p>
          <p>music</p>
          <p>contacts</p>
        </div>
      </nav>
    </header>    
  );
};

export default NavBar;