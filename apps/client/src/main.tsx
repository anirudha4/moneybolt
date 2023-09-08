import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools'

import App from './App.tsx'
// assets
import './index.css';
import 'react-day-picker/dist/style.css';

import { AuthProvider, UIProvider } from '@contexts';


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </AuthProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);