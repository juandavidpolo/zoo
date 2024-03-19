import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Views from "./views";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Views />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
