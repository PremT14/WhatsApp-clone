import React from 'react'

const ReceiverDetails = () => {
  return (
    <div className='m-0 p-0 border h-13 w-100% bg-black overflow-hidden'>
        <div className=' flex items-center justify-start'>
            <img className='h-10 w-10 object-cover rounded-full m-1' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgPcKhcX9AGOPBT1K-9Cpowlho9a51ZHwawGEFFfLHIRrHCBgm3XD5m6MS&s=10" alt="" />
            <div className='mt-2.5 p-0 border h-10 w-100% bg-black'>
                <div className='text-white'>username</div>
            </div>
        </div>
    </div>
  )
}

export default ReceiverDetails