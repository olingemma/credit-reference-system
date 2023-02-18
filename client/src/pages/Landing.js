import {Logo} from "../components";
import main from "../assets/images/crf.svg";
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1 title="Welcome">
                    credit <span>reference</span>
                </h1>
                <p>
                    A platform to monitor your credit services.
                </p>
                <Link to='/register' className="btn btn-hero">Login/Register</Link>
            </div>
            <img src={main} alt='Credit reference' className='img main-img'/>
        </div>
    </Wrapper>
  )
}

