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
exports.backgroundJobs = backgroundJobs;
require('dotenv').config();
const axios_1 = __importDefault(require("axios"));
const db_1 = __importDefault(require("../db"));
const node_cron_1 = __importDefault(require("node-cron"));
const COINGENCO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const COINS = ["bitcoin", "matic-network", "ethereum"];
function fetchCryptoData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(COINGENCO_API_URL, {
                params: {
                    ids: COINS.join(','),
                    vs_currencies: "usd",
                    include_market_cap: true,
                    include_24hr_change: true,
                }
            });
            const data = yield response.data;
            // save to db
            for (const coinId in data) {
                const coinData = data[coinId];
                const formattedName = coinId.charAt(0).toUpperCase() + coinId.slice(1).toLowerCase();
                const priceData = new db_1.default({
                    coinId,
                    name: coinId === 'matic-network' ? "Matic" : formattedName,
                    currentPrice: coinData.usd,
                    marketCap: coinData.usd_market_cap,
                    changeIn24h: parseFloat(coinData.usd_24h_change.toFixed(2))
                });
                yield priceData.save();
                console.log(`saved dat for ${coinId}`);
            }
            console.log('All crypto data updated successfully');
        }
        catch (error) {
            console.error("Error in fetching crypto data:", error.message);
        }
    });
}
function backgroundJobs() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchCryptoData();
        node_cron_1.default.schedule('0 */2 * * *', () => __awaiter(this, void 0, void 0, function* () {
            console.log("Running scheduled crypto data fetch...");
            yield fetchCryptoData();
        }));
    });
}
