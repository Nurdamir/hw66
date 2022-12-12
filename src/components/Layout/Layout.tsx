import React from 'react';
import {Link} from "react-router-dom";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Link to="/">Calories tracker</Link>
      </header>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;