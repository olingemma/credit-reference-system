import { useAppContext } from "../../context/appContext"
import {Link, Navigate} from 'react-router-dom';
import {Info,Alert,Loading, LoanInfo} from '../../components';
// import {GiFastBackwardButton} from 'react-icons/gi';
import Wrapper from '../../assets/wrappers/JobsContainer';
import currencyFormatter from 'currency-formatter';
import History from "../../components/History";
import moment from 'moment'
import { useState } from "react";



export default function Client() {
    const [showHistory,setShowHistory]=useState(true)
    const {
        isLoading,
        clearClient,
        clientId,
        clients,
        loans,
        showAlert,
        client_nin
    }= useAppContext()

    const client = clients.find(element=>{
        return element._id===clientId;
    })

    const clientLoans = loans.filter(element=>{
        return element.client_id===clientId
    }) 

    const pendingLoans= clientLoans.filter(element=>{
        return element.status==='active' || element.status==='pending'
    })

    console.log('pending',pendingLoans)

    const allLoans= loans.filter(element=>{
        return element.client_nin===client_nin
    })

    const getDate= (time)=>{
        let date = moment(time)
      date = date.format('MMM Do, YYYY')
      return date
    }

    console.log('client loans',clientLoans)
    console.log('client',client)
    const handleClick=(e)=>{
        clearClient()
    }

    if(!client){
        return <Navigate to={'/all-clients'}/>
    }   

    function calculate(interest,principle){
        let rate= interest/100
        let i= principle*rate
        let total= principle+i
        return Math.round( total)
    }

    function handleHistory(){
        setShowHistory(!showHistory)
    }

    
    if(isLoading){
            return(
                <Loading center/>
            )
        }
        
        return (
          <Wrapper>
              <Info firstName={client.firstName} lastName={client.lastName} date={getDate(client.createdAt)} nin={client.nin} sex={client.gender} maritalStatus={client.maritalStatus} phone={client.phone} address={client.address}/>    
              <div style={{display:'flex',justifyContent:'space-between',width:'90%',margin:'2rem auto'}}>
                <Link to='/all-clients' onClick={handleClick}><button style={{
                    padding:'1rem',
                    backgroundColor:'#14919b',
                    borderWidth:'0px',
                    color:'white',
                    cursor:'pointer',
                    borderRadius:'10px'
                    
                    }}>Return</button></Link>
                <button
                    style={{
                    padding:'1rem',
                    backgroundColor:'gray',
                    borderWidth:'0px',
                    color:'White',
                    cursor:'pointer',
                    borderRadius:'10px'
                        
                    }}
                    onClick={handleHistory}
                >{showHistory?'History':'Loans'}</button>
              </div>
              {showAlert&&<Alert/>}
              {/* active loans */}
           { showHistory?  <div className='jobs'>
                {pendingLoans.length<1?(<h1 style={{margin:'1rem auto'}}>No active loans...</h1>):(
                    pendingLoans.map((loan,index)=>{
                        return <LoanInfo 
                        key={index} 
                        lastName={client.lastName}
                        date={getDate(loan.createdAt)}
                        principle={currencyFormatter.format(loan.principle,{locale:'UGX'})}
                        interest={loan.interestRate}
                        schedule={`${loan.period} ${loan.repaymentSchedule}`}
                        status={loan.status}
                        disburse={'disburse'}
                        moneyBack={currencyFormatter.format(calculate(loan.interestRate,loan.principle,loan.repaymentSchedule),{locale:'UGX'})}
                        id={loan._id}
                        />
                    })
                )}
              </div>:
              <div>
                {
                   allLoans.length<1?<h1>No history...</h1>:( allLoans.map(item=>{
                        return <History principle={currencyFormatter.format(item.principle,{locale:'UGX'})+' ugx'} repaymentSchedule={`${item.period} ${item.repaymentSchedule}`} status={item.status} date={getDate(item.createdAt)}/>
                    }))
                }
              </div>
                }
          </Wrapper>
        )

}
