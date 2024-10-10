require('dotenv').config(); 
import axios from 'axios'
import CryptoPrice from '../db'; 
import cron from 'node-cron' 

const COINGENCO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

// ******************** Task 1 ********************* 

const COINS = ["bitcoin","matic-network","ethereum"];

async function fetchCryptoData() {
  try {
 
 const response =  await axios.get(COINGENCO_API_URL,{
     params:{
      ids:COINS.join(','),
      vs_currencies:"usd",
      include_market_cap:true,
      include_24hr_change:true,
     }
  });

  const data = await response.data; 
  // save to db
  for(const coinId in data){
    const coinData = data[coinId];
    const formattedName =  coinId.charAt(0).toUpperCase() + coinId.slice(1).toLowerCase();
    const priceData = new CryptoPrice({
      coinId,
      name: coinId==='matic-network'?"Matic":formattedName,
      currentPrice:coinData.usd,
      marketCap:coinData.usd_market_cap,
      changeIn24h:parseFloat(coinData.usd_24h_change.toFixed(2))
    })

    await priceData.save();
    console.log(`saved dat for ${coinId}`);
  } 
  
  console.log('All crypto data updated successfully');
  
} catch (error:any) {
    console.error("Error in fetching crypto data:", error.message); 
}

}
 

export async function backgroundJobs(){
  await fetchCryptoData();


  cron.schedule('0 */2 * * *',async()=>{
    console.log("Running scheduled crypto data fetch...");
    await fetchCryptoData();
  })
  
}
 