import React from 'react';
import {Link} from "react-router-dom";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header className="text-center mt-3">
        <Link className="text-uppercase text-decoration-none fw-bold fs-1" to="/">Calories tracker</Link>
      </header>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;