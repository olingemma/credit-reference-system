import validator from 'validator';
import mongoose from 'mongoose';

const clientSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Please provide first name'],
        minlength:3,
        maxlength:15,
        trim:true
    },
    //     email: {
    //   type: String,
    //   required: [true, 'Please provide email'],
    //   validate: {
    //     validator: validator.isEmail,
    //     message: 'Please provide a valid email',
    //   },
    //   unique: true,
    // }
    // ,
    middleName:{
        type:String,
        trim:true,
        required:false
    },
    lastName:{
        type:String,
        required:[true,'Please provide last name'],
        minlength:3,
        maxlength:15,
        trim:true
    },
    gender:{
        type:String,
        default:'male',
        enum:['male','female'],
        trim:true
    },
    phone:{
        type:String,
        trim:true,
        minLength:10,
        maxLength:10,
        required:[true,'Please provide client phone number.']
    },
    nin:{
        trim:true,
        type:String,
        minlength:14,
        maxlength:14,
        required:[true,'Please provide your nin number.'],
        unique:true
    }
    ,
    maritalStatus:{
        type:String,
        required:[true,'Please provide marital status'],
        trim:true,
        enum:['single','married','divorced']
    },
    numberOfChildren:{
        type:Number,
        default:0
    },
    address:{
        type:String,
        required:[true,'Please provide address'],
        trim:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,'Please provide user.']
    },
    loanStatus:{
       type:String,
       enum:['pending','defaulter','completed'],
       default:'pending' 
    }  
},{timestamps:true}
)

export default mongoose.model('Client',clientSchema);