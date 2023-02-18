import { createContext, useReducer,useContext } from "react";
import {
    GIVE_MONEY_START,
    GIVE_MONEY_SUCCESS,
    REJECT_LOAN_START,
    REJECT_LOANL_SUCCESS,
    GET_CLIENT_START,
    GET_CLIENT_SUCCESS,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    DELETE_CLIENT_BEGIN,
    DELETE_CLIENT_ERROR,
    DELETE_CLIENT_SUCCESS,
    LOAN_START,
    CREATE_LOAN_SUCCESS,
    CREATE_LOAN_START,
    CREATE_LOAN_ERROR,
    HANDLE_LOAN_CHANGE,
    GET_CLIENTS_BEGIN,
    GET_CLIENTS_SUCCESS,
    CREATE_CLIENT_BEGIN,
    CREATE_CLIENT_ERROR,
    CREATE_CLIENT_SUCCESS,
    CLEAR_VALUES,HANDLE_CHANGE,
    CLEAR_ALERT,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER,
    CANCEL_LOAN_SUBMIT, 
    CLEAR_FILTERS, 
    CHANGE_PAGE, 
    CLEAR_CLIENT_DATA,
    DISBURSE_LOAN_START,
    DISBURSE_LOAN_SUCESS,
    WRITE_OFF_START,
    WRITE_OFF_SUCESS
} from "./actions";

import reducer from "./reducer";
import axios from 'axios';

const token= localStorage.getItem('token')
const user= localStorage.getItem('user')
const userLocation= localStorage.getItem('location')

const initialState= {
    isLoading:false,
    showAlert:false,
    alertText:'',
    alertType:'',
    user:user?JSON.parse(user):null,
    token:token,
    userLocation:userLocation||'',
    showSidebar:true,
    isEditing:false,
    jobLocation:userLocation||'',
    firstName:'',
    middleName:'',
    lastName:'',
    gender:'',
    maritalStatus:'',
    nin:'',
    phone:'',
    numberOfChildren:0,
    clientId:'',
    address:"",
    clients:[],
    loans:[],
    page:1,
    numOfPages:0,
    totalClients:1,
    principle:0,
    interestRate:0,
    status:'pending',
    repaymentSchedule:'',
    stats:{},
    monthlyApplications:[],
    search:'',
    loanStatus:'all',
    statusOptions:['pending','defaulter','completed'],
    sort:'latest',
    sortOptions:['latest','oldest','a-z','z-a'],
    client_data:{},
    client_nin:''
}

const AppContext=createContext();

const AppProvider= ({children})=>{
    const [state,dispatch]= useReducer(reducer,initialState);
    
    const authFetch= axios.create({
        baseURL:'/api/v1',
        // headers:{
        //     Authorization: `Bearer ${state.token}`
        // }
    })

    // request
    authFetch.interceptors.request.use(
    (config)=>{
        config.headers['Authorization']=`Bearer ${state.token}`
        return config
    },(error)=>{
        return Promise.reject(error)
    })

    // response
    authFetch.interceptors.response.use(
        (response)=>{
              return response
    },(error)=>{
        console.log(error.response);
        if(error.response.status===401){
            logoutUser();
            console.log('AUTH ERROR')
        }
        return Promise.reject(error)
    })

    
    const displayAlert= ()=>{
        dispatch({type:DISPLAY_ALERT})
        clearAlert();
    }

    const clearAlert=()=>{
        setTimeout(()=>{
            dispatch({type:CLEAR_ALERT})
        },3000)
    }

    const addUserToLocalStorage= ({user,token,location})=>{
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',token);
        localStorage.setItem('location',location)
    }

    const removeUserFromLocalStorage=({user,token,location})=>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
    }

    const registerUser = async (currentUser) =>{
        dispatch({type:REGISTER_USER_BEGIN});
        try{
            const response= await axios.post('/api/v1/auth/register',currentUser)
            console.log(response);
            const {user,token,location}=response.data
            dispatch({
                type:REGISTER_USER_SUCCESS,
                payload:{user,token,location}
            })
            addUserToLocalStorage({user,token,location})
        }catch(error){
            dispatch({type:REGISTER_USER_ERROR,payload:error})
        }
    }
    
    const loginUser= async(currentUser)=>{
        dispatch({type:LOGIN_USER_BEGIN});
        try{
            const response= await axios.post('/api/v1/auth/login',currentUser)
            
            const {user,token,location}=response.data
            dispatch({
                type:LOGIN_USER_SUCCESS,
                payload:{user,token,location}
            })
            addUserToLocalStorage({user,token,location})
        }catch(error){
            dispatch({type:LOGIN_USER_ERROR,payload:{msg:error.response.data.msg}})
        }
    }
    
    const toggleSidebar= ()=>{
        dispatch({type:TOGGLE_SIDEBAR});
    }

    const logoutUser= ()=>{
        dispatch({type:LOGOUT_USER});
        removeUserFromLocalStorage();
    }

    const updateUser= async(currentUser)=>{
        dispatch({type:UPDATE_USER_BEGIN});
        try{
            const response = await authFetch.patch('/auth/updateUser',currentUser)
            const {user,location,token}=response.data
            dispatch({type:UPDATE_USER_SUCCESS,payload:{user,location,token}});
            addUserToLocalStorage({user,location,token})
        }catch(err){
            console.log(err);
            if(err.response.status !==401){
                dispatch({type:UPDATE_USER_ERROR,payload:{msg:err.response.data.msg}})
            }
        }
        clearAlert();
    }

    const handleChange= ({name,value})=>{
        dispatch({type:HANDLE_CHANGE,payload:{name,value}})
    }

    const clearValues =()=>{
        dispatch({type:CLEAR_VALUES})
    }

    const createClient=async ()=>{
        dispatch({type:CREATE_CLIENT_BEGIN});
        try{
            const {firstName,lastName,middleName,maritalStatus,nin,phone,address,gender}=state
            await authFetch.post('/client',{
                firstName,
                lastName,
                gender,
                middleName,
                maritalStatus,
                nin,
                phone,
                address
            })
            console.log(firstName,lastName,gender,middleName,maritalStatus,address);

            dispatch({type:CREATE_CLIENT_SUCCESS})
            dispatch({type:CLEAR_VALUES});
        }catch(err){
            console.log(err);
            if(err.response.status !==401){
                dispatch({type:CREATE_CLIENT_ERROR,payload:{msg:err.response.data.msg}})
            }
        }
        clearAlert()
    }

    const getClients=async ()=>{
        const {search,loanStatus,sort,page}= state
        let url= `/client?page=${page}&loanStatus=${loanStatus}&sort=${sort}`
        if(search){
            url= url+`&search=${search}`
        }
        dispatch({type:GET_CLIENTS_BEGIN});
        try{
            let response= await authFetch(url);
            const {clients,totalClients,numOfPages,loans}=response.data
            dispatch({type:GET_CLIENTS_SUCCESS,payload:{clients,totalClients,numOfPages,loans}})
        }catch(err){
            logoutUser();
        }
        clearAlert()
    }

    const applyForLoan=async (id)=>{
        dispatch({type:LOAN_START,payload:{id}})
        clearAlert()
    }
    
    const getSingleClient=async(id)=>{
        // const {clientId}= state;
        dispatch({type:GET_CLIENT_START})
        try{
            const {data}=await authFetch.get(`/client/${id}`)
            dispatch({type:GET_CLIENT_SUCCESS,payload:{client:data}})
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }

    const clearClient= ()=>{
        dispatch({type:CLEAR_CLIENT_DATA});
    }

    const cancelLoan=()=>{
        dispatch({type:CANCEL_LOAN_SUBMIT})
        clearAlert()
    }

    const handleLoanChange=({name,value})=>{
        dispatch({type:HANDLE_LOAN_CHANGE,payload:{name,value}})
    }

    const createLoan=async()=>{
        dispatch({type:CREATE_LOAN_START})
        try{
            const {principle,repaymentSchedule,interestRate,clientId,client_nin}= state
            let client_id=clientId
            await authFetch.post('/loan',{
                principle,
                repaymentSchedule,
                interestRate,
                
                client_id,
                client_nin
            })
            
            dispatch({type:CREATE_LOAN_SUCCESS})
        }catch(err){
            console.log(err);
            if(err.response.status !==401){
                dispatch({type:CREATE_LOAN_ERROR,payload:{msg:err.response.data.msg}})
            }
        }
    }

    const deleteClient= async(id)=>{
        dispatch({type:DELETE_CLIENT_BEGIN});
        try{
            await authFetch.delete(`/client/${id}`);
            getClients()
            dispatch({type:DELETE_CLIENT_SUCCESS});
            clearAlert();
        }catch(err){
            console.log(err);
            if(err.response.status !==401){
                dispatch({type:DELETE_CLIENT_ERROR,payload:{msg:err.response.data.msg}})
            }
        }
    }

    const getIndividualLoans= async(id)=>{
        try{
            let loans=await authFetch(`/loans/getloans/${id}`)
            console.log(loans)
            return loans
        }catch(err){
            console.log(err)
        }
    }

    const showStats= async ()=>{

        dispatch({type:SHOW_STATS_BEGIN});
        try{
            const {data}= await authFetch('/loan/stats')
            dispatch({
                type:SHOW_STATS_SUCCESS,
                payload:{
                    stats:data.defaultStats,
                    monthlyApplications:data.monthlyApplications
                }
            })
        }catch(err){
            console.log(err.response)
        }
        clearAlert();
    }

    const clearFilters=()=>{
            dispatch({type:CLEAR_FILTERS});
    }

    const changePage=(page)=>{
        dispatch({type:CHANGE_PAGE,payload:{page}})
        
        console.log('dispatched');
    }

    const disburse=async(id)=>{
        dispatch({type:DISBURSE_LOAN_START})
        try{
            await authFetch.patch(`/loan/${id}?status=completed`)
            dispatch({type:DISBURSE_LOAN_SUCESS});
        }catch(err){
            console.log(err)
        }
        clearAlert();
    }
        const writeOff=async(id)=>{
        dispatch({type:WRITE_OFF_START})
        try{
            await authFetch.patch(`/loan/${id}?status=defaulted`)
            dispatch({type:WRITE_OFF_SUCESS});
        }catch(err){
            console.log(err)
        }
        clearAlert();
    }

    const giveMoney=async(id)=>{
        dispatch({type:GIVE_MONEY_START})
        try{
            await authFetch.patch(`/loan/${id}?status=active`)
            dispatch({type:GIVE_MONEY_SUCCESS});
        }catch(err){
            console.log(err)
        }
        clearAlert();
    }
        const reject=async(id)=>{
        dispatch({type:REJECT_LOAN_START})
        try{
            await authFetch.patch(`/loan/${id}?status=rejected`)
            dispatch({type:REJECT_LOANL_SUCCESS});
        }catch(err){
            console.log(err)
        }
        clearAlert();
    }



    return <AppContext.Provider value={{...state,reject,giveMoney,writeOff,disburse,clearClient,getSingleClient,changePage,clearFilters,showStats,getIndividualLoans,deleteClient,createLoan,handleLoanChange,cancelLoan,applyForLoan,getClients,createClient,handleChange,clearValues,updateUser,logoutUser,loginUser,toggleSidebar,displayAlert,registerUser}}>{children}</AppContext.Provider>
}

const useAppContext=()=>{
    return useContext(AppContext)
}
export {AppProvider,initialState,useAppContext};