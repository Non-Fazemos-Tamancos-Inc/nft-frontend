import './styles/reset.css'
import './styles/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { Index } from './views'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
)
