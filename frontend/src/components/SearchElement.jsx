import React from 'react'

const SearchElement = () => {
  return (
    <div className='w-100 flex items-center justify-center'>
        <input className='bg-amber-100 fixed w-85 p-2 m-2 flex border border-black rounded-3xl top-4' type="text" placeholder='Search'/>
    </div>
  )
}

export default SearchElement