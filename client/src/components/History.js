import {FcApproval} from 'react-icons/fc'
import {GiCancel} from 'react-icons/gi'
import {BsFillCalendar2WeekFill} from 'react-icons/bs'
import {MdPending} from 'react-icons/md'

export default function History({principle,repaymentSchedule,status,date}) {
    let icon
    if(status==='pending'){
        icon=<MdPending style={{color:'yellow'}}/>
    }else if(status==='defaulted'){
        icon=<GiCancel style={{color:'red'}}/>
    }else if(status==='active'){
        icon=<MdPending style={{color:'blue'}}/>
    }else if(status==='rejected'){
        icon=<GiCancel styled={{color:'orange'}}/>
    }else{
        icon=<FcApproval/>
    }

    return (
    <div style={{
        display:'flex',
        justifyContent:'space-around',
        backgroundColor:'white',
        alignItems:'center',
        paddingTop:'1rem',
        marginBottom:'1rem',
        boxShadow:'2px 2px 10px black'
        }}>
        <div>
            <h3>{date}</h3>
        </div>
        <div style={{
            display:'flex',
            justifyContent:'space-around',
            width:'70%'
            }}>
            <p style={{color:'darkgreen'}}>{principle}</p>
            <p style={{display:'flex',alignItems:'center'}}><BsFillCalendar2WeekFill/><span> -{repaymentSchedule}</span></p>
            <p>{status}</p>
            <p>{icon}</p>
        </div>
    </div>
  )
}
