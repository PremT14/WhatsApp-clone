import React from 'react'
import HomePage from './pages/HomePage'
import { io } from "socket.io-client"
import { useEffect } from 'react'

const socket = io("http://localhost:3000")

const App = () => {
  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("Conneccted through socket io", socket.id)
    })
  }, [HomePage])
  return (
    <div className='border-2px border border-b-black h-100vh w-100vw'>
      <HomePage />
    </div>
  )
}

export default App