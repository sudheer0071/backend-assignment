import dotenv from 'dotenv';

dotenv.config();

import mongoose, { Schema } from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!;
console.log(process.env.MONGODB_URI);
if(!MONGODB_URI){
  throw new Error("MONGODB_URI in env is not set")
}

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

interface CryptoPriceDocument extends Document {
  coinId: string;
  name:string,
  currentPrice: number;
  marketCap:number;
  changeIn24h:number;
  timeStamp:Date; 
}

const cryptoPriceSchema:Schema = new mongoose.Schema<CryptoPriceDocument>({
  coinId:{
    type:String,
    trim:true,
    require:true
  },
  name:{
    type:String,
    require:true,
  },
  currentPrice:{
    type:Number,
    require:true,
  },
  marketCap:{
    type:Number,
    require:true
  },
  changeIn24h:{
    type:Number,
    require:true
  },
  timeStamp:{
    type:Date,
    default:Date.now
  }
})

connectToDatabase();

const CryptoPrice = mongoose.model<CryptoPriceDocument>('CryptoPrice',cryptoPriceSchema)

export default CryptoPrice;