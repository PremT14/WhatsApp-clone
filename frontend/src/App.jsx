import React from 'react'
import HomePage from './pages/HomePage'
import { io } from "socket.io-client"
import SignUp from './pages/SignUp'
import { useEffect } from 'react'

const socket = io("http://localhost:3000")

const App = () => {
  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("Conneccted through socket io", socket.id)
    })
  }, [HomePage])
  return (
    <div className='h-100vh w-100vw'>
      {/* <HomePage /> */}
      <SignUp />
    </div>
  )
}

export default App