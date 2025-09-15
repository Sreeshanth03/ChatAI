import React from 'react'
import Signup from './Login&Singup/Signup'
import Login from './Login&Singup/Login'
import ChatWindow from './Components/ChatWindow'
import Home from './Home/Home'
import {Routes,Route} from "react-router-dom"
import "./App.css"
const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/"element={<Home/>}></Route>
      <Route path="/chat" element={<ChatWindow/>}></Route>
    </Routes>
      {/* <Signup/>
      <Login/> */}
      {/* <ChatWindow/> */}
    </div>
  )
}

export default App
