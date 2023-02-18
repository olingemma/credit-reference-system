import Wrapper from '../assets/wrappers/Job';
import {ClientInfo} from '../components';
import {AiFillCreditCard, AiOutlinePercentage} from 'react-icons/ai'
import {FcMoneyTransfer} from 'react-icons/fc'
import { BsFillCalendarCheckFill } from "react-icons/bs";
import {GrStatusInfo} from 'react-icons/gr';
import { useAppContext } from '../context/appContext';

export default function LoanInfo({id,date,lastName,interest,principle,moneyBack,status,schedule}) {
  const {isLoading,disburse,writeOff,giveMoney,reject}= useAppContext()
  const handleDisburse=()=>{
    disburse(id)
  }
  const handleWriteOff=()=>{
    writeOff(id)
  }

  const handleGiveMoney=()=>{
    giveMoney(id)
  }

  const handleReject=()=>{
    reject(id)
  }

    let color
  if(status==='pending'){
    color='pending'
  }else if(status==='completed'){
    color='interview' 
  }else if(status==='active'){
    color='interview'
  }
  else{
    color='declined'
    }
    return (
    <Wrapper> 
        <header>
            <div className='main-icon'>{lastName.charAt(0)}</div>
            <div className='info'> 
                <p>Loan date</p>
                <h3>{date}</h3> 
            </div>
        </header>
        <div className='content'>
            <div className={`status ${color}`}>{status}</div>
            <div className='content-center'>
                <ClientInfo icon={<FcMoneyTransfer/>} text={principle+" ugx"}/>
                <ClientInfo icon={<BsFillCalendarCheckFill/>} text={schedule}/>
                <ClientInfo icon={<AiFillCreditCard/>} text={moneyBack+' ugx'}/>
                <ClientInfo icon={<GrStatusInfo/>} text={status}/>
                <ClientInfo icon={<AiOutlinePercentage/>} text={interest}/>
            </div>
            <footer>
            <button
              type='button'
              className='btn edit-btn'
              onClick={status==='pending'?handleGiveMoney:handleDisburse}
              disabled={isLoading}
            >
              {status==='pending'?'Disburse':'Clear'}
            </button>
              <button type='button' className='btn delete-btn' onClick={status==='pending'?handleReject:handleWriteOff} disabled={isLoading}>{status==='pending'?'reject':'write off'}</button>
            </footer>
        </div>
    </Wrapper>
  )
}
