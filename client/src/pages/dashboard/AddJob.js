import {FormRow,Alert, FormRowSelect} from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage';

export default function AddJob() {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    statusOptions,
    status,
    handleChange,
    clearValues
  }=useAppContext();

  const handleSubmit= (e)=>{
    e.preventDefault();
    if(!position || !company || !jobLocation){
      displayAlert()
      return
    }
    console.log('create job');
  }

  const handleJobInput = (e)=>{
    const name= e.target.name;
    const value= e.target.value;
    console.log(`${name}:${value}`)
    handleChange({name,value})
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing?'Edit job':'Add job'}</h3>
          {showAlert&& <Alert/>}
<div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            labelText={'position'}
            value={position}
            name='position'
            handleChange={handleJobInput}
          />

        {/*  company */}
          <FormRow
            type='text'
            labelText={'Company'}
            value={company}
            name='company'
            handleChange={handleJobInput}
          />

        {/* location */}
            <FormRow
            type='text'
            labelText='Job Location'
            value={jobLocation}
            name='location'
            handleChange={handleJobInput}
          />
          {/*  job type*/}
            <FormRowSelect
              name='jobType'
              labelText='Job Type'
              list={jobTypeOptions}
              value={jobType}
              handleJobInput={handleJobInput}
            />
          {/* job type */}
          
            <FormRowSelect
              name='status'
              labelText='Status'
              list={statusOptions}
              value={status}
              handleJobInput={handleJobInput}
            />

          <div className='btn-container'>
            <button className='btn btn-block submit-btn' type='submit' onClick={handleSubmit}>
              submit
            </button>
            <button className='btn btn-block clear-btn' onClick={(e)=>{
              e.preventDefault()
              clearValues()
              }}>
                clear
            </button>
          </div>
          
          
</div>
      </form>
    </Wrapper>
  )
}
