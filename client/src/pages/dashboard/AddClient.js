import React from 'react'
import {FormRow,Alert, FormRowSelect} from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage';
const maritalStatus_list=['Select marital status','single','married','divorced'];
const gender_list=['Select gender','male','female'];
// const country_list = ["Select country","Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


// import PhoneInput from 'react-phone-number-input';


export default function AddClient() {
    const {createClient,isLoading,displayAlert,clearValues,handleChange,nin,phone,firstName,showAlert,lastName,gender,maritalStatus,middleName,address,numberOfChildren}= useAppContext();

    const handleClientInput= (e)=>{
        const name= e.target.name;
        const value= e.target.value;
        console.log(name,value)
        handleChange({name,value})
    }

    const handleSubmit= (e)=>{
      e.preventDefault()
      try{
        if(!firstName||!lastName||!address){
          displayAlert();
          clearValues();
          return
        }
        createClient();
      }catch(err){
        console.log(err)
      }
    }


    return (
    <Wrapper>
      <form className='form'>
        <h3>Add Client</h3>
          {showAlert&& <Alert/>}
        <div className='form-center'>
          {/* First name */}
          <FormRow
            type='text'
            labelText={'First Name*'}
            value={firstName}
            name='firstName'
            handleChange={handleClientInput}
          />

        {/*  Middlename */}
          <FormRow
            type='text'
            labelText={'Middle Name'}
            value={middleName}
            name='middleName'
            handleChange={handleClientInput}
          />

        {/* Last Name */}
            <FormRow
            type='text'
            labelText='Last Name*'
            value={lastName}
            name='lastName'
            handleChange={handleClientInput}
          />
          {/* Gender */}
          <FormRowSelect
            type='text'
            labelText={'Gender*'}
            list={gender_list}
            name='gender'
            value={gender}
            handleChange={handleClientInput}

          />
          {/* Marital Status */}
          <FormRowSelect
            type='text'
            labelText={'Marital Status*'}
            name="maritalStatus"
            list={maritalStatus_list}
            value={maritalStatus}
            handleChange={handleClientInput}
          />

          {/* Nationality  */}
        <FormRow
        type="text"
          name={'nin'}
          handleChange={handleClientInput}
          value={nin}
          labelText='National Id No*'        
        />

        <FormRow
        type="text"
          name="phone"
          handleChange={handleClientInput}
          value={phone}
          labelText={'Phone*'}
        />

        {/* Number of children */}
          <FormRow
            type='number'
            labelText={'Number of children*'}
            name="numberOfChildren"
            value={numberOfChildren}
            handleChange={handleClientInput}
          />
        {/* address */}
        <FormRow
            type='text'
            labelText={'Address*'}
            name="address"
            value={address}
            handleChange={handleClientInput}
          />
          {/* Buttons */}
          <div className='btn-container'>
            <button className='btn btn-block submit-btn' disabled={isLoading} type='submit' onClick={handleSubmit}>
              {isLoading?'loading...':'Submit'}
            </button>
            <button className='btn btn-block clear-btn' onClick={(e)=>{
              e.preventDefault()
              clearValues()
            console.log('clicked')
              }}>
                clear
            </button>
          </div>
          
          
</div>
      </form>
    </Wrapper>
  )
}
