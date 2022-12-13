import React from 'react';
import {Link} from "react-router-dom";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Link className="text-uppercase text-decoration-none text-black" to="/">Calories tracker</Link>
      </header>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;