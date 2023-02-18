import Client from '../models/Client.js';
import Loan from '../models/Loan.js';
import { ObjectId } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import {NotFoundError,BadRequestError,UnauthenticatedError} from '../errors/index.js';
import mongoose from 'mongoose';

const createClient= async  (req,res)=>{
    const {firstName,lastName,gender,maritalStatus,numberOfChildren,nin,phone,address}= req.body
    if(!firstName|| !lastName || !gender || !nin||!phone || !maritalStatus ||!address){
        throw new BadRequestError('Please provide all values')
    }    

    const foundClient= await Client.find({nin:nin});
    if(foundClient.length>0){
        console.log(foundClient)
        throw new BadRequestError(`Client already exists ${nin}`)
    }

    const number= await Client.find({phone:phone});
    if(number.length>0){
        throw new BadRequestError('Number already registered! Use a different number')
    }

    req.body.createdBy=req.user.userId
    const client = await Client.create(req.body);
    res.status(StatusCodes.CREATED).json({client});
}

const getAllClients= async (req,res)=>{

    const {loanStatus,sort,search}= req.query

     const queryObject= {
        // createdBy:req.user.userId
    }

    // add stuff base on condition
    if(loanStatus!=='all'){
        queryObject.loanStatus=loanStatus
    }    

    if(search){
        queryObject.lastName={$regex:search,$options:'i'}
    }

    // No await
    let result = Client.find(queryObject)

    // chain sort conditions
    if(sort==='latest'){
        result= result.sort('-createdAt')
    }
    if(sort==='oldest'){
        result= result.sort('createdAt')
    }
    if(sort==='a-z'){
        result=result.sort('lastName')
    }
    if(sort==='z-a'){
        result=result.sort('-lastName')
    }


    // setup pagination;

    const page = Number(req.query.page)||1
    const limit= Number(req.query.limit)||10;
    const skip=(page-1)*limit
    console.log('page',page);
    result= result.skip(skip).limit(limit);

    const clients= await result;

    const totalClients= await Client.countDocuments(queryObject);
    const numOfPages= Math.ceil(totalClients/limit);
    const loans= await Loan.find().sort('-createdAt');

    res.status(StatusCodes.OK).json({clients,totalClients,numOfPages,loans})
}

const deleteClient=async (req,res)=>{
    const {id:client_id}= req.params

    const client=await Client.findOne({_id:client_id});

    if(!client){
        throw new NotFoundError('The client does not exist')
    } 

    const deletedClient = await Client.findOneAndDelete({_id:client_id})
    
    res.status(StatusCodes.OK).json({deletedClient});

    // res.send(`Delete ${req.params.id}`)
}

const getSingleClient= async(req,res)=>{
    const {id}= req.params

    
    const client = await Client.find({_id:id})
    if(!client){
        throw new NotFoundError(`There was no client with this id:${id}`)
    }
    const loans= await Loan.find({client_id:id})

    res.status(StatusCodes.OK).json({client,loans});
}


export {getSingleClient,createClient,getAllClients,deleteClient};