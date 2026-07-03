import React from 'react';
import ReactDOM from 'react-dom/client';
import AppProvider from '@/app/AppProvider';
import AppRouter from '@/app/Router';
import '@/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </React.StrictMode>
);
