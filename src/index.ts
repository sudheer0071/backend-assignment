require('dotenv').config()
import express, { Application, Router } from 'express'
import router from './routes' 
import { backgroundJobs } from './routes/background-job'
const app:Application = express() 

app.use(express.json()) 
const port = process.env.PORT || 8080
app.use('/api/v1',router) 

app.get('/',(req,res)=>{
  res.json({
    title:"Backend Internship Assigment",
    Task1_solution:"https://github.com/sudheer0071/backend-assignment/blob/main/src/routes/background-job.ts",
    Task2_solution:"https://assignment1.sudheer.tech/api/v1/jobs/stats?coin=<coin_id>",
    Task3_solution: "https://assignment1.sudheer.tech/api/v1/jobs/deviation?coin=<coin_id>"
  })
})
app.listen(port,()=>{
  console.log(`server is listening on port ${port}`);
}) 

backgroundJobs()
