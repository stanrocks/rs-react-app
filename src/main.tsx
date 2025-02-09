import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement !== null && rootElement !== undefined) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}
