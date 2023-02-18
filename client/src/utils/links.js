import {IoBarChartSharp} from "react-icons/io5";
import {MdQueryStats} from "react-icons/md";
// import {FaWpforms} from "react-icons/fa";
import {ImProfile} from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";

const links=[
    {
        id:1,
        text:'stats',
        path:'/',
        icon:<IoBarChartSharp/>
    },
    {
        id:2,
        text:'all clients',
        path:'all-clients',
        icon:<MdQueryStats/>
    },
    {
        id:4,
        text:'Add client',
        path:'add-client',
        icon:<FaUserAlt/>
    },
    {
        id:5,
        text:'profile',
        path:'profile',
        icon:<ImProfile/>
    }

]

export default links