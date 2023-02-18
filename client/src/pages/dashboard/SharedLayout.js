import {Outlet} from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { SmallSidbar,BigSidebar,Navbar } from '../../components/index';

export default function SharedLayout() {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidbar/>
        <BigSidebar/>
        <div>
          <Navbar/>
          <div className='dashboard-page'>
            <Outlet/>
          </div>  
        </div>  
      </main>
    </Wrapper>
  )
}
