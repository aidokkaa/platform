import React, { FormEvent } from 'react'
import { ChangeEvent } from 'react'

const RegisterPage = () => {
    const [user,setUser]=React.useState({
      firstName:'',
      lastName:'',
        email:'',
        password:'',
        gender:"",
    })
    console.log(user)
    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setUser((prev)=>({...prev,[e.target.name]:e.target.value}))
        console.log(user)
        
    }
    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
     try{
      const res = await fetch('http://localhost:3000/api/users/register',{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(user)
      }
      );
      if(!res.ok){
        throw new Error('Register failed!')
      }
      const data = await res.json();
      console.log('Register successful:', data);
     }catch(error){
          console.error('Error:', error);
     }
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange}type="text" placeholder='First Name' value={user.firstName} name='firstName' required/>
        <input onChange={handleChange}type="text" placeholder='Last Name' value={user.lastName} name='lastName' required/>
        <input onChange={handleChange}type="text" placeholder='Gender' value={user.gender} name='gender' required/>
        <input onChange={handleChange} type="email" name='email' value={user.email} placeholder='Email' required />
        <input onChange={handleChange} type="password" name='password' value={user.password} placeholder='Password' required />
         <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default RegisterPage
