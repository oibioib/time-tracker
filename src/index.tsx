import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './i18n';
import reportWebVitals from './reportWebVitals';

import './index.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
