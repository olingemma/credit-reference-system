import { useAppContext } from "../context/appContext"
import StatItem from "./StatItem"
import { FaSuitcaseRolling,FaCalendarCheck,FaBug } from "react-icons/fa"
import {TfiWrite} from 'react-icons/tfi'
import Wrapper from "../assets/wrappers/StatsContainer";

export default function StatsContainer() {
    const {stats}= useAppContext();
    
    const defaultStats=[
        {
            title:'pending loans',
            count:stats.pending||0,
            icon:<FaSuitcaseRolling/>,
            color:'#e9b949',
            bcg:'#fcefc7'
        },
        {
            title:'Completed loans',
            count:stats.completed||0,
            icon:<FaCalendarCheck/>,
            color:'#647acb',
            bcg:'#e0e8f9'
        },
        {
            title:'Defaulted loans',
            count:stats.defaulted||0,
            icon:<FaBug/>,
            color:'#d66a6a',
            bcg:'#ffeeee'
        },
        {
            title:'Written off',
            count:stats.written_off||0,
            icon:<TfiWrite/>,
            color:"#000000",
            bcg:"#706D6D"
        }
    ]
  return (
    <Wrapper>
        {defaultStats.map((item,index)=>{
            return <StatItem key={index} {...item}/>
        })}
    </Wrapper>
  )
}