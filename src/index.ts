require('dotenv').config()
import express, { Application, Router } from 'express'
import router from './routes' 
import { backgroundJobs } from './routes/background-job'
const app:Application = express() 

app.use(express.json()) 
const port = process.env.PORT || 8080
app.use('/api/v1',router) 

app.get('/',(req,res)=>{
  res.send("backend is working fine")
})
app.listen(port,()=>{
  console.log(`server is listening on port ${port}`);
}) 

backgroundJobs()
