import {GIVE_MONEY_START,GIVE_MONEY_SUCCESS,REJECT_LOANL_SUCCESS,REJECT_LOAN_START,WRITE_OFF_START,WRITE_OFF_SUCESS,DISBURSE_LOAN_START,DISBURSE_LOAN_SUCESS,GET_CLIENT_SUCCESS,GET_CLIENT_START,CHANGE_PAGE,CLEAR_FILTERS,DELETE_CLIENT_BEGIN,DELETE_CLIENT_ERROR,DELETE_CLIENT_SUCCESS,CREATE_LOAN_ERROR,LOAN_START,CREATE_LOAN_START,CREATE_LOAN_SUCCESS,GET_CLIENTS_ERROR,GET_CLIENTS_BEGIN,GET_CLIENTS_SUCCESS,CREATE_CLIENT_BEGIN,CREATE_CLIENT_SUCCESS,CREATE_CLIENT_ERROR,LOGOUT_USER,CLEAR_VALUES,HANDLE_CHANGE,UPDATE_USER_BEGIN,UPDATE_USER_ERROR,UPDATE_USER_SUCCESS, CLEAR_ALERT, DISPLAY_ALERT,LOGIN_USER_ERROR,LOGIN_USER_SUCCESS, LOGIN_USER_BEGIN, REGISTER_USER_BEGIN,REGISTER_USER_ERROR,REGISTER_USER_SUCCESS, TOGGLE_SIDEBAR, CANCEL_LOAN_SUBMIT, HANDLE_LOAN_CHANGE, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, CLEAR_CLIENT_DATA, DEFAULT_SUCCESS, DEFAULT_START} from "./actions";
import { initialState } from "./appContext";

const reducer = (state,action)=>{
    if(action.type===DISPLAY_ALERT){
        return {...state,showAlert:true,alertType:'danger',alertText:'Please provide all values.'}
    }
    if(action.type===CLEAR_ALERT){
        return {...state,showAlert:false,alertType:'',alertText:''}
    }

    if(action.type===REGISTER_USER_BEGIN){
        return {...state,isLoading:true}
    }

    if(action.type===REGISTER_USER_SUCCESS){
        return {
            ...state,
            user:action.payload.user,
            token:action.payload.token,
            userLocation:action.payload.location,
            jobLocation:action.payload.location,
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'User Created! Redirecting...'
        }
    }

    if(action.type=== REGISTER_USER_ERROR){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.response.data.msg
        }
    }

    if(action.type===LOGIN_USER_BEGIN){
        return {...state,isLoading:true}
    }
    if(action.type===LOGIN_USER_SUCCESS){
        return {
            ...state,
            user:action.payload.user,
            token:action.payload.token,
            userLocation:action.payload.location,
            jobLocation:action.payload.location,
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'Login successful! Redirecting...'
        }
    }

    if(action.type=== LOGIN_USER_ERROR){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg
        }
    }
    if(action.type=== TOGGLE_SIDEBAR){
        return {...state,showSidebar:!state.showSidebar}
    }   
    if(action.type===LOGOUT_USER){
        return {...initialState,user:null,token:null,jobLocation:'',userLocation:''}
    }

    if(action.type===UPDATE_USER_BEGIN){
        return {...state,isLoading:true}
    }

    if(action.type===UPDATE_USER_SUCCESS){
        return {
            ...state,
            user:action.payload.user,
            token:action.payload.token,
            userLocation:action.payload.location,
            jobLocation:action.payload.location,
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'Update successful...'
        }
    }

    if(action.type===UPDATE_USER_ERROR){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg
        }
    }
        if(action.type===HANDLE_CHANGE){
        return {
            ...state,
            [action.payload.name]:action.payload.value
        }
    }

    if(action.type===CLEAR_VALUES){
        const initialState={
            isEditing:false,
            firstName:'',
            lastName:'',
            middleName:'',
            address:'',
        }
        return {...state,...initialState}
    }

    if(action.type===CREATE_CLIENT_SUCCESS){
        return {
            ...state,
            firstName:'',
            middleName:'',
            lastName:'',
            gender:'',
            maritalStatus:'',
            nationality:'',
            numberOfChildren:0,
            nin:'',
            phone:'',
            isLoading:false,
            showAlert:true,
            alertType:'success',
            alertText:'Client created successfuly...'
        }
    }
    
    if(action.type===CREATE_CLIENT_BEGIN){
        return {...state,isLoading:true,showAlert:false}
    }

    if(action.type===CREATE_CLIENT_ERROR){
        return {
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg
        }
    }

    if(action.type===GET_CLIENTS_BEGIN){
        return{
            ...state,isLoading:true,showAlert:false
        }
    }

    if(action.type===GET_CLIENTS_ERROR){
        return{
            ...state,
            isLoading:false,
            showAlert:true,
            alertType:'danger',
            alertText:action.payload.msg,
        }
    }

    if(action.type===GET_CLIENTS_SUCCESS){
        return {
            ...state,
            clients:action.payload.clients,
            totalClients:action.payload.totalClients,
            numOfPages:action.payload.numOfPages,
            loans:action.payload.loans,
            isLoading:false,
            page:1
        }
    }

    if(action.type===LOAN_START){
        const client= state.clients.find((client)=>client._id===action.payload.id)
        const {firstName,_id,nin}= client

        return{
            ...state,
            firstName,
            clientId:_id,
            client_nin:nin
        }

    }

    if(action.type===CANCEL_LOAN_SUBMIT){
        return{...state,firstName:'',clientId:'',principle:0,
    interestRate:0,
    status:'',
    repaymentSchedule:'',
    client_nin:''
}
    }

    if(action.type===HANDLE_LOAN_CHANGE){
        return {
            ...state,
            [action.payload.name]:action.payload.value
        }
    }

    if(action.type===CREATE_LOAN_START){
        return {...state,isLoading:true}
    }

    if(action.type===CREATE_LOAN_SUCCESS){
        return{
            ...state,
            isLoading:false,
            alertType:'success',
            showAlert:true,
            alertText:"Loan successfully created!",
            client_nin:''
        }
    }
    if(action.type===CREATE_LOAN_ERROR){
        return{
            ...state,
            isLoading:false,
            alertType:'danger',
            showAlert:true,
            alertText:action.payload.msg
        }
    }
    if(action.type===DELETE_CLIENT_BEGIN){
        return {...state,isLoading:true};
    }

    if(action.type===DELETE_CLIENT_SUCCESS){
        return{
            ...state,
            isLoading:false,
            alertType:'success',
            showAlert:true,
            alertText:"Client successfully deleted!"
        }
    }

    
    if(action.type===DELETE_CLIENT_ERROR){
        return{
            ...state,
            isLoading:false,
            alertType:'danger',
            showAlert:true,
            alertText:action.payload.msg
        }
    }

    if(action.type===SHOW_STATS_BEGIN){
        return {...state,isLoading:true,showAlert:false}
    }

    if(action.type===SHOW_STATS_SUCCESS){
        return {
            ...state,
            isLoading:false,
            stats:action.payload.stats,
            monthlyApplications:action.payload.monthlyApplications
        }
    }

    if(action.type===CLEAR_FILTERS){
        return {
            ...state,
            search:'',
            loanStatus:'all',
            sort:'latest'
        }
    }

    if(action.type===CHANGE_PAGE){
        return {...state,page:action.payload.page}
    }
    if(action.type===GET_CLIENT_START){
        return {...state,isLoading:true}
    }

    if(action.type===GET_CLIENT_SUCCESS){
        return {...state,isLoading:false,client_data:action.payload.client}
    }

    if(action.type===CLEAR_CLIENT_DATA){
        return {...state,client_data:{},clientId:''}
    }

    if(action.type===DISBURSE_LOAN_START){
        return {...state}
    }
    if(action.type===DISBURSE_LOAN_SUCESS){
        return {
            ...state,
            isLoading:false,
            alertType:'success',
            showAlert:true,
            alertText:"Success, reload to see your client's loan status!"
        }
    }
    if(action.type===WRITE_OFF_START){
        return {...state}
    }
    if(action.type===WRITE_OFF_SUCESS){
        return {
            ...state,
            isLoading:false,
            alertType:'success',
            showAlert:true,
            alertText:"Client successfully written off from loan! Status may take two minutes to reflect"
        }
    }

      if(action.type===DEFAULT_START){
        return {...state}
    }
    if(action.type===DEFAULT_SUCCESS){
        return {
            ...state,
            isLoading:false,
            alertType:'success',
            showAlert:true,
            alertText:"Client has defaulted loan"
        }
    }



    if(action.type===GIVE_MONEY_START){
        return {...state}
    }
    if(action.type===GIVE_MONEY_SUCCESS){
        return {
            ...state,
            isLoading:false,
            alertType:'success',
            showAlert:true,
            alertText:"Success, status may take up to two minutes to update!"
        }
    }
        if(action.type===REJECT_LOAN_START){
        return {...state}
    }

    if(action.type===REJECT_LOANL_SUCCESS){
        return {
            ...state,
            isLoading:false,
            alertType:'success',
            showAlert:true,
            alertText:"Loan rejected, status may take up to two mintues to update!"
        }
    }

    throw new Error(`no such action: ${action.type}`)
}


export default reducer;