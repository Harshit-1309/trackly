import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './styles/index.css'
import App from './App.jsx'

// Override to bypass Hostinger restrictive firewalls for PUT/PATCH/DELETE
axios.interceptors.request.use(config => {
  if (config.method && ['put', 'patch', 'delete'].includes(config.method.toLowerCase())) {
     config.headers['X-HTTP-Method-Override'] = config.method.toUpperCase();
     config.method = 'post';
  }
  return config;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
