import React from 'react'
import { useState } from 'react'

const SignUp = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('')
    return (
      <div>
        <form className=''>
            <input type="text" placeholder='Enter Your Name' />
            <input type="text" placeholder='Enter Your Email' />
            <input type="text" placeholder='Enter Your Password' />
            <button type="submit"></button>
        </form>
      </div>
    )
}

export default SignUp