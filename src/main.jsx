import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import Router from './Routes/Router.jsx';
import { HelmetProvider } from 'react-helmet-async';
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <HelmetProvider>
        <div className='max-w-7xl mx-auto '>
          <RouterProvider router={Router} />
        </div>
      </HelmetProvider>
    </QueryClientProvider>


  </React.StrictMode>,
)
