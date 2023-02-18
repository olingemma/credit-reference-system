import {useState} from 'react';
import {FormRow,Alert} from '../../components';
import {useAppContext} from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
// import { MdEmail } from 'react-icons/md';

export default function Profile() {
  const {user,showAlert,displayAlert,updateUser,isLoading}= useAppContext()

  const [name,setName]= useState(user?.name);
  const [email,setEmail]= useState(user?.email);
  const [lastName,setLastName]= useState(user?.lastName);
  const [location,setLocation]= useState(user?.location);

 function handleSubmit(e){
  e.preventDefault();
  if(!name || !email || !lastName || !location){
    displayAlert()
    return
  }

  updateUser({name,email,lastName,location})
 }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert&& <Alert/>}
        
        {/* name */}
        <div className='form-center'>
          <FormRow
            labelText='Name'
            type='text'
            name='name'
            handleChange={(e)=> setName(e.target.value)}
            value={name}
          />
          <FormRow
            labelText='Alias'
            type='text'
            name='last name'
            handleChange={(e)=> setLastName(e.target.value)}
            value={lastName}
          />
          <FormRow
            labelText='Email'
            type='email'
            name='email'
            handleChange={(e)=> setEmail(e.target.value)}
            value={email}
          />
          <FormRow
            labelText='Location'
            type='text'
            name='location'
            handleChange={(e)=> setLocation(e.target.value)}
            value={location}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>{isLoading?'Please wait...':'save changes'}</button>
        </div>
      </form>
    </Wrapper>
  )
}
