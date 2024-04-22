import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import Contextapi from './Contexts/Contextapi.jsx'
import TokenAuthentication from './Contexts/TokenAuthentication.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Contextapi>
    <TokenAuthentication>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </TokenAuthentication>
   </Contextapi>
  </React.StrictMode>,
)
