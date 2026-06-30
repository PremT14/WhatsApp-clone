import React from 'react'
import ChatHeader from '../components/ChatHeader'
import HomeLeft from '../components/HomeLeft'
import HomeRight from '../components/HomeRight'

const HomePage = () => {
  return (
    <div className='m-0 p-0 bg-black-900 grid grid-flow-col grid-cols-[1fr_4fr] h-screen w-100%'>
        <HomeLeft />
        <HomeRight />
    </div>
  )
}

export default HomePage