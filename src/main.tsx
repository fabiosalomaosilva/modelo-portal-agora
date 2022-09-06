import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes';
import store from './store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <AppRoutes />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
