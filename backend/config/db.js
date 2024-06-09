import mongoose from 'mongoose'
import { mongoDBURL } from './config.js';

export default mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
    })
    .catch((error)=>{
        console.log(error);
    }); 
