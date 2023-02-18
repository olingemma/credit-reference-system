import Wrapper from '../assets/wrappers/BigSidebar';
import NavLinks from'./NavLinks';
import Logo from './Logo';
import { useAppContext } from '../context/appContext';


export default function BigSidebar() {
  const {showSidebar}= useAppContext();
  return (
    <Wrapper>
        <div className={showSidebar?'sidebar-container':'show-sidebar sidebar-container'}>
          <div className='content'>
            <header><Logo/></header>
          
            <NavLinks/>
          </div>
        </div>
    </Wrapper>
  )
}
