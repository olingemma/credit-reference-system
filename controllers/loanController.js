import {BadRequestError, NotFoundError} from '../errors/index.js';
import Loan from '../models/Loan.js';
import {StatusCodes} from 'http-status-codes';
import mongoose from 'mongoose';
import moment from 'moment';

const createLoan=async (req,res)=>{
    const {principle,repaymentSchedule,interestRate,client_nin,client_id}=req.body

    if(!principle||!repaymentSchedule||!interestRate||!client_id||!client_nin){
        throw new BadRequestError("Please provide all values.")
    }
    req.body.mfi_id= req.user.userId

    const loan= await Loan.create(req.body)

    res.status(StatusCodes.CREATED).json({loan})
    
}

const getLoan= async(req,res)=>{
    const {id:clientId}= req.params

    const loans=await Loan.find({_id:clientId});

    if(!loans) throw new NotFoundError('Not loans from the above client')

    res.status(StatusCodes.OK).json({loans});
}

const showStats= async(req,res)=>{
    let stats= await Loan.aggregate([
        {$match:{mfi_id:mongoose.Types.ObjectId(req.user.userId)}},
        {$group:{_id:'$status',count:{$sum:1}}}
    ])

    stats=stats.reduce((acc,curr)=>{
        const {_id:title,count}=curr
        acc[title]=count
        return acc
    },{})

    const defaultStats={
        pending:stats.pending||0,
        completed:stats.completed||0,
        defaulted:stats.defaulted||0,
        written_off:stats.written_off||0
    }

    let monthlyApplications=await Loan.aggregate([
        {$match:{mfi_id:mongoose.Types.ObjectId(req.user.userId)}},
        {
            $group:{
                _id:{
                    year:{
                        $year:'$createdAt'
                    },
                    month:{
                        $month:'$createdAt'
                    }
                },
                count:{$sum:1}
            }
        },
        {$sort:{'_id.year':-1,'_id.month':-1}},
        {$limit:6}
    ])

    monthlyApplications= monthlyApplications.map((item)=>{
        const{
            _id:{year,month},
            count,
        }=item
        // accepts 0-11
        const date= moment()
        .month(month-1)
        .year(year)
        .format('MMM Y')

        return {date,count}
    })
    .reverse()
    res.status(StatusCodes.OK).json({defaultStats,monthlyApplications})
    // res.send('stats galore')
}

const updateLoan= async(req,res)=>{
    const {id}= req.params;
    const {status}=req.query
    const loan= await Loan.findById({_id:id});
    console.log(typeof status)
    let name= status
    if(!loan){
        throw new NotFoundError(`No loan with this id :${id}`)
    }

    
    let updated=await Loan.findOneAndUpdate({_id:id},{status:name})

    // console.log(updated.modifiedCount)
    res.status(StatusCodes.OK).json({updated})   
}

export {createLoan,getLoan,showStats,updateLoan};