import express, { Request, Response, Router } from 'express';
import CryptoPrice from '../db'; 

const routes: Router = express.Router();

// ******************** Task 2 ********************* 
routes.get('/stats', async (req: Request, res:Response) => {
  try {
    const  { coin }  = req.query;
    const valid = await CryptoPrice.findOne({ coinId: coin }); 
    if (!valid) {  
      res.json({message:"Invalid coin name"})
      return;
    }
    
    res.json({
    price:valid.currentPrice,
    marketCap:valid.marketCap,
    "24hChange":valid.changeIn24h,
  })
   
} catch (error) {
  console.error('Error calculating deviation:', error);
  res.status(500).json({ message: 'Internal server error' });
  return;
}
});


// ******************** Task 2 *********************
interface CryptoPriceDocument  {
  currentPrice: number;
  // other fields you might expect in the document
}
function getGeviation(arr: number[]):number{
  const n = arr.length;
  const mean = arr.reduce((a, b) => a + b, 0) / n;
  const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
  return Math.sqrt(variance);
}

routes.get('/deviation',async(req:Request,res:Response)=>{
 try {
   const {coin} = req.query; 
   
   const allPrices:CryptoPriceDocument[] = await CryptoPrice.find(
     { coinId: coin },
     { currentPrice: 1, _id: 0 } 
    ).limit(100).lean();  
    
    if (!allPrices.length) {  
      res.json({message:"Invalid coin name"})
      return;
  }
  
  // converting allPrices object into array
  const prices:number[] = allPrices.map(price=>price.currentPrice); 
  
  const deviation = getGeviation(prices)
  res.json({deviation:deviation.toFixed(3)}) 
  
 } catch (error) {
  console.error('Error calculating deviation:', error);
  res.status(500).json({ message: 'Internal server error' });
  return;
 }
})

export default routes;
