import moment from 'moment'
import { FaLocationArrow, FaCalendarAlt } from 'react-icons/fa'
import {BsFillPeopleFill,BsGenderAmbiguous} from 'react-icons/bs'
import {AiFillPhone} from 'react-icons/ai'
import {MdSportsScore} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import ClientInfo from './ClientInfo'

const Client = ({
  _id,
  firstName,
  lastName,
  maritalStatus,
  phone,
  createdAt,
  address,
  gender,
  nin,
  loanStatus
}) => {
  

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
  const {isLoading,applyForLoan,deleteClient,loans}= useAppContext();
   function viewClient(e){
    applyForLoan(_id)
    // localStorage.setItem('client_data',)
  }


    
    let allLoans=loans.map(item=>{
      return {c_nin:item.client_nin,status:item.status}
    })
    console.log("nin loans",allLoans);
    let clientLoans= allLoans.filter(loan=>{
      return loan.c_nin===nin
    })
    let completed= clientLoans.filter(loan=>{
      return loan.status==='completed'
    }).length
    let defaulted=clientLoans.filter(item=>{
      return item.status==='defaulted'
    }).length
    
    const total= completed+defaulted
    let creditScore
    const score= (completed/total)*100
    if(allLoans){
      creditScore=Math.round(score)
    }else{
      creditScore= 'new'
    }
  
    console.log('credit score',typeof creditScore)
  function handleLoanApplication(e){
    applyForLoan(_id)
  }
  
  function handleDelete(e){
    deleteClient(_id)
  }

  let color

  if(creditScore>=50&&creditScore<70){
    // eslint-disable-next-line
    color='pending'
  }else if(creditScore>70){
    color='interview'
  }else if(creditScore<50){
    color='declined'
  }else{
    color='interview'
  }
  
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{lastName.charAt(0)}</div>
        <div className='info'>
          <h5>{lastName}</h5>
          <p>{firstName}</p>
        </div>
      </header>
      <div className='content'>
        <Link to='/client' className='btn edit-btn' onClick={viewClient}>view</Link>
        <div className='content-center'>
          <ClientInfo icon={<FaLocationArrow />} text={address} />
          <ClientInfo icon={<FaCalendarAlt />} text={date} />
          <ClientInfo icon={<AiFillPhone />} text={phone} />
          <ClientInfo icon={<BsFillPeopleFill/>} text={maritalStatus}/>
          <ClientInfo icon={<BsGenderAmbiguous/>} text={gender}/>
          <div className={`status ${color}`}><MdSportsScore/> {!allLoans?'new':`${isNaN(creditScore)?'no score':`${creditScore}%`}`}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/loan-application'
              className='btn edit-btn'
              onClick={handleLoanApplication}
            >
              Create Loan
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading?'Deleting':'Delete'}
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Client
