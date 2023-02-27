import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import './i18n';
import reportWebVitals from './reportWebVitals';
import store from './store';

import './index.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
