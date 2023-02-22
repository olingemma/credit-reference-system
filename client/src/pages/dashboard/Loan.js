import React from 'react'
import {FormRow,Alert, FormRowSelect} from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { Navigate } from 'react-router-dom';
const repaymentSchedule_list= ['Select schedule','days','months','years'];
export default function Loan() {
  
    const {
  isLoading,
  // clearValues,
  showAlert,
  firstName,
  cancelLoan,
  handleLoanChange,
  principle,
  interestRate,
  period,
  repaymentSchedule,
  createLoan,
  displayAlert,
  clearAlert
    }= useAppContext();

    const handleClientInput= (e)=>{
      const name= e.target.name
      const value= e.target.value
      handleLoanChange({name,value})
}

    const handleSubmit= (e)=>{
      e.preventDefault()
     if(!principle||!repaymentSchedule||!interestRate||!period){
        displayAlert()
        clearAlert()
        return
     }
     createLoan()
     setTimeout(()=>{
      cancelLoan()
     },3000)
    }

    const handleCancel=(e)=>{
      e.preventDefault()
      cancelLoan();
    }

    if(!firstName){
      return <Navigate to={'/all-clients'}></Navigate>
    }

    return (
    <Wrapper>
      <form className='form'>
        <h1>{firstName}</h1>
        <h3>Loan Application</h3>
          {showAlert&& <Alert/>}
        <div className='form-center'>
          {/* First name */}
          <FormRow
            type='number'
            labelText={'Principle*'}
            name='principle'
            value={principle}
            handleChange={handleClientInput}
          />

          {/*  Middlename */}
          <FormRow
            type='number'
            labelText={'Interest Rate (%)'}
            name='interestRate'
            value={interestRate}
            handleChange={handleClientInput}
          />
          
          <FormRowSelect
            type='text'
            labelText={'Repayment Schedule'}
            name="repaymentSchedule"
            list={repaymentSchedule_list}
            value={repaymentSchedule}
            handleChange={handleClientInput}
          />

          <FormRow
            type='number'
            labelText={'Period'}
            name='period'
            value={period}
            handleChange={handleClientInput}
          />

          {/* Buttons */}
          <div className='btn-container'>
            <button className='btn btn-block submit-btn' disabled={isLoading} type='submit' onClick={handleSubmit}>
              {isLoading?'loading...':'Apply'}
            </button>
            <button className='btn btn-block clear-btn' onClick={handleCancel}>
                cancel
            </button>
          </div>          
        </div>
      </form>
    </Wrapper>
  )
}
