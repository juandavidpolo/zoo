import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Views from "./views";

import Notification from "src/components/notifications";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Views />} />
        </Routes>
      </BrowserRouter>
      <div className="notification--container">
        <Notification/>
      </div>
    </>
  );
}

export default App;
