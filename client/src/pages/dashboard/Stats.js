import { useEffect } from "react"
import { useAppContext } from "../../context/appContext"
import {StatsContainer,Loading,ChartsContainer} from '../../components';
// import Loading from "../../components/Loading";


export default function Stats() {
  const {showStats,isLoading}= useAppContext()
  
  useEffect(()=>{
    showStats()
    //eslint-disable-next-line
  },[])

  if(isLoading){
    return <Loading center/>
  }

  return (
    <>
      <StatsContainer/>
      <ChartsContainer/>
    </>
  )
}
