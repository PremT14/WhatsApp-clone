import React from 'react'
import { useState } from 'react'
import axios from "axios"

const SignUp = () => {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('')

    const submitHandler = (e)=>{
        e.preventDefault();
        const newObj = {
            name: Name,
            email: Email,
            password: Password
        }

        const resp = axios.post()
        
    };
    return (
      <div className='h-screen w-100% flex items-center justify-center'>
        <form onSubmit={(e) => {submitHandler(e)} } className='border h-70 bg-blue-300 rounded-2xl flex flex-col gap-1 items-center justify-center'>
            <label htmlFor="SignUp">SignUp details</label>
            <input className='name m-1 p-1 h-10 w-90 border rounded-2xl bg-white' type="text" placeholder='Enter Your Name' onChange={(e)=> setName(e.target.value)} />
            <input className='email m-1 p-1 h-10 w-90 border rounded-2xl bg-white' type="text" placeholder='Enter Your Email' onChange={(e)=> setEmail(e.target.value)}/>
            <input className='password m-1 p-1 h-10 w-90 border rounded-2xl bg-white' type="text" placeholder='Enter Your Password' onChange={(e)=> setPassword(e.target.value)}/>
            <button className='m-5 mb-1 p-1 h-10 w-90 border rounded-2xl bg-lime-100' type="submit">Submit</button>
        </form>
      </div>
    )
}

export default SignUp