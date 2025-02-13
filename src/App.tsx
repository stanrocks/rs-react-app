import React from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import NotFound from './components/NotFound.tsx';
import Layout from './components/Layout.tsx';
import DetailsPanel from './components/DetailsPanel.tsx';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/search/*" element={<Layout />}>
          <Route index element={<DetailsPanel />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
