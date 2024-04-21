import express from "express";
import { PORT,mongoDBURL } from './config/config.js';
//import dotenv from 'dotenv'
import  mongoose  from "mongoose";
import cors from 'cors';
import employeeRoutes  from './routes/employeeRoutes.js'
import departmentRoutes  from './routes/departmentRoutes.js'
import functionRoutes  from './routes/functionRoutes.js'
import roleRoutes  from './routes/roleRoutes.js'
import leaveRoutes  from './routes/leaveRoutes.js'
import avanceRoutes from "./routes/avanceRoutes.js";
import refundRoutes from "./routes/refundRoutes.js"
//dotenv.config()
const app = express();

//Middleware for parsing reques body
app.use(express.json());

//that allows All Origins with with default of cors(*)
app.use(cors());

app.get('/',(req,resp)=>{
    console.log(req);
    return resp.status(200).send('aslema mel org app')
})

app.use('/employee', employeeRoutes)
app.use('/department', departmentRoutes)
app.use('/function', functionRoutes)
app.use('/role', roleRoutes)
app.use('/leave', leaveRoutes)
app.use('/avance', avanceRoutes)
app.use('/refund', refundRoutes)


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    });