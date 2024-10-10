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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const routes = express_1.default.Router();
// ******************** Task 2 ********************* 
routes.get('/stats', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coin } = req.query;
        const valid = yield db_1.default.findOne({ coinId: coin });
        if (!valid) {
            res.json({ message: "Invalid coin name" });
            return;
        }
        res.json({
            price: valid.currentPrice,
            marketCap: valid.marketCap,
            "24hChange": valid.changeIn24h,
        });
    }
    catch (error) {
        console.error('Error calculating deviation:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}));
function getGeviation(arr) {
    const n = arr.length;
    const mean = arr.reduce((a, b) => a + b, 0) / n;
    const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    return Math.sqrt(variance);
}
routes.get('/deviation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coin } = req.query;
        const allPrices = yield db_1.default.find({ coinId: coin }, { currentPrice: 1, _id: 0 }).lean();
        if (!allPrices.length) {
            res.json({ message: "Invalid coin name" });
            return;
        }
        // converting allPrices object into array
        const prices = allPrices.map(price => price.currentPrice);
        const deviation = getGeviation(prices);
        res.json({ deviation: deviation.toFixed(3) });
    }
    catch (error) {
        console.error('Error calculating deviation:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}));
exports.default = routes;
