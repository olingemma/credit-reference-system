import styled from 'styled-components';
import profile from '../assets/images/profile.jpg'

const Main= styled.div`
    padding:2rem 1rem;
    background-color: white;
    .img-div{
        width:20%;
    }
    display: flex;
    .info-div{
        width:70%;
        display:flex;
        justify-content: space-around;
    }
    border-radius: 1rem;
    .img-div{
        margin:2rem auto;
    }
    .info{
        p{
            margin-bottom: 0;
            padding-bottom: 0;
        }
    }
`


export default function Info({firstName,lastName,nin,date,sex,maritalStatus,address,phone}) {
  return (
    <Main>
        <div className='img-div'><img src={profile} alt='img'/></div>
        <div className='info-div'>
            <div className='info'>
                <div>
                    <p>First Name</p>
                    <h3>{firstName}</h3>
                </div>
                <div>
                    <p>Marital status</p>
                    <h3>{maritalStatus}</h3>
                </div>
                <div>
                    <p>Date</p>
                    <h3>{date}</h3>
                </div>
            </div>
            <div className='info'>
                <div>
                    <p>Last Name</p>
                    <h3>{lastName}</h3>
                </div>
                <div>
                    <p>Gender</p>
                    <h3>{sex}</h3>
                </div>
                <div style={{position:'relative',left:'4rem'}}>
                    <p>National ID</p>
                    <h3>{nin}</h3>
                </div>
            </div>
            <div className='info'>
                <div>
                    <p>Phone</p>
                    <h3>{phone}</h3>
                </div>
                <div>
                    <p>Address</p>
                    <h3>{address}</h3>
                </div>
            </div>
        </div>
    </Main>
  )
}
