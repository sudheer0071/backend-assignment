import express, { Router } from 'express'  
import routes from './jobs'

const router:Router = express.Router()  


router.use('/jobs',routes) 
router.get('/',(req, res)=>{
  res.send("backend is working fine for index.js route inside routes folder")
})
export default router;


