import { model, models, Schema } from "mongoose";

export type Job = {
    _id: string;
    title : string;
    orgName?:string; 
    remote : string; 
    type : string; 
    salary : number;
    country : string; 
    state : string; 
    city : string; 
    jobIcon : string;
    personPhoto : string; 
    contactName: string; 
    contactPhoto: string;
    contactPhone: string; 
    contactEmail: string; 
    orgId : string; 
    createdAt: string;
    updatedAt: string;
}

const JobsSchema = new Schema({
    title : {type: String , required: true},
    remote : {type: String , required: true},
    type : {type: String , required: true},
    salary : {type: Number , required: true},
    country : {type: String , required: true},
    state : {type: String , required: true},
    city : {type: String , required: true},
    jobIcon : {type: String },
    personPhoto : {type: String },
    contactName: {type: String , required: true},
    contactPhoto: {type: String},
    contactPhone: {type: String , required: true},
    contactEmail: {type: String , required: true},
    orgId : {type: String , required: true},   
} , {
    timestamps : true, 
})

export const JobModel = models?.Job || model('Job' , JobsSchema)  //No idea