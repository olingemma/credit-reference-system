import { useState, useEffect } from "react";
import {Logo,FormRow,Alert} from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from "../context/appContext";
import {useNavigate} from 'react-router-dom';


const initialState={
  name:'',
  email:'',
  password:'',
  isMember:true,
  showAlert:false
}

export default function Register() {
  const navigate= useNavigate();
  const [values,setValues]= useState(initialState);
  // global state and useNavigate
  const {loginUser,isLoading,showAlert,displayAlert,registerUser,user}= useAppContext();
  
  // Input handler
  function handleChange(e){
    setValues({...values,[e.target.name]:e.target.value})
  }

  
  // Submit function 
  function onSubmit(e){
    e.preventDefault();
    const {name,email,password,isMember}= values
    if(!email||!password||(!isMember&&!name)){
      displayAlert()
      return
    }

    const currentUser= {name,email,password};
    if(isMember){
      loginUser(currentUser);
    }else{
      registerUser(currentUser);
      displayAlert();
    }
  
  }

  const toggleMember= ()=>{
    setValues({...values,isMember:!values.isMember})
  }

  let text;
  if(!values.isMember){
    text='Regsiter'
  }else{
    text='Login'
  }


  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate("/")
      },3000)
    }  
  },[user,navigate])

  return (
    <Wrapper className='full-page'>
      <form className="form" onSubmit={onSubmit}>
        <Logo/>
        <h3>{values.isMember?'Login':'Register'}</h3>
        {showAlert===true&&(<Alert/>)}
        {/* name input */}
        {!values.isMember&&<FormRow type='text' labelText='Name' name='name' value={values.name} handleChange={handleChange} />}
        {/* email input */}
        <FormRow type='email' labelText='Email' name='email' value={values.email} handleChange={handleChange} />
        {/* password input */}
        <FormRow type='password' labelText='Password' name='password' value={values.password} handleChange={handleChange} />
      <button type='submit' className='btn btn-block' disabled={isLoading}>{isLoading?'Loading...':text}</button>
      <p>
        {values.isMember?"Not a member yet ?":"Already a member ?"}
        <button type='button' onClick={toggleMember} className='member-btn'>
          {values.isMember?'Register':'Login'}
        </button>
      </p>
      </form>
    </Wrapper>
  )
}
