"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI;
console.log(process.env.MONGODB_URI);
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI in env is not set");
}
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(MONGODB_URI);
            console.log('Connected to MongoDB');
        }
        catch (error) {
            console.error('MongoDB connection error:', error);
            process.exit(1);
        }
    });
}
const cryptoPriceSchema = new mongoose_1.default.Schema({
    coinId: {
        type: String,
        trim: true,
        require: true
    },
    name: {
        type: String,
        require: true,
    },
    currentPrice: {
        type: Number,
        require: true,
    },
    marketCap: {
        type: Number,
        require: true
    },
    changeIn24h: {
        type: Number,
        require: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});
connectToDatabase();
const CryptoPrice = mongoose_1.default.model('CryptoPrice', cryptoPriceSchema);
exports.default = CryptoPrice;
