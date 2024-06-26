import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/usercontext';  // Импортируйте UserProvider
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Оберните App в UserProvider */}
    <UserProvider>
      <App />
    </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
