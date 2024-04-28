import express from "express";
import mongoose from "./config/db.js";
import { PORT } from './config/config.js';
//import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import employeeRoutes  from './routes/employeeRoutes.js'
import departmentRoutes  from './routes/departmentRoutes.js'
import functionRoutes  from './routes/functionRoutes.js'
import roleRoutes  from './routes/roleRoutes.js'
import leaveRoutes  from './routes/leaveRoutes.js'
import avanceRoutes from "./routes/avanceRoutes.js";
import refundRoutes from "./controllers/refundController.js"
import fichePaieRoutes from "./routes/fichePaieRoutes.js"
import attestationRoutes from "./routes/attestationRoutes.js"
import requestsRoutes from "./routes/requestRoutes.js"
//dotenv.config()
const app = express();

//Middleware for parsing reques body
app.use(express.json());
app.use(cookieParser())

app.use(express.static('public/refund_files'))

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
app.use('/fiche-paie', fichePaieRoutes)
app.use('/attestation', attestationRoutes)
app.use('/requests', requestsRoutes)

app.listen(PORT, ()=>{
    console.log(`App is listening to port: ${PORT}`);
})