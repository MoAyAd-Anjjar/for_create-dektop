import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import DataProvider from './Provider/DataProvider.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')).render(
  
  <DataProvider>
    
  <StrictMode>
    <App />
   < ToastContainer />
  </StrictMode>
  </DataProvider>
)
