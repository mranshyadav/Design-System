import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BlocksApp } from './BlocksApp.jsx'

const isBlocks = window.location.hash === '#blocks'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isBlocks ? <BlocksApp /> : <App />}
  </React.StrictMode>,
)
