import React from 'react'
import Logo from './Logo.jsx'
import SearchElement from './SearchElement.jsx'

const ChatHeader = () => {
  return (
    <div className='w-100 flex items-center justify-center gap-5'>
        <Logo />
        <SearchElement />
    </div>
  )
}

export default ChatHeader