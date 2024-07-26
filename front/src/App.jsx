import './App.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Chat from './componentes/Chat/Chat'
import Signin from './componentes/Signin/Signin'
import Logo from './componentes/Logo/Logo'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Logo />
    <Chat />
  </React.StrictMode>,
)
