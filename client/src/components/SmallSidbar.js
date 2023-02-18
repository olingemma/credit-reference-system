import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';
import Logo from './Logo';

export default function SmallSidbar() {
  const {showSidebar,toggleSidebar}= useAppContext()
  return (
    <Wrapper>
        <div className={showSidebar?'sidebar-container show-sidebar':"sidebar-container"}>
          <div className='content'>
            <button className='close-btn' type='button' onClick={toggleSidebar}>
              <FaTimes/>
            </button>
            <header>
              <Logo/>
            </header>
            <NavLinks toggleSidebar={toggleSidebar}/>
          </div>
        </div>
    </Wrapper>
  )
}
