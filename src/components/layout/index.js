import React from "react";

import Navigation from "./navbar";

const Layout = ({ children }) => {
  return(
    <div className="custom--layout">
      <Navigation />
      {children}
    </div>
  )
}

export default Layout;