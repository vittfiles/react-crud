import React from 'react'
import ReactDOM from 'react-dom/client'
import {CrudFake} from './components/CrudFake.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CrudFake />
  </React.StrictMode>,
)
