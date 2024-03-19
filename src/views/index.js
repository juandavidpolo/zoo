import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from "src/components/layout";
import Animals from 'src/views/animals';

const Views = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Animals />} />
      </Routes>
    </Layout>
  );
}

export default Views;