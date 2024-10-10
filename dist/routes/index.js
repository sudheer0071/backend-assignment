"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobs_1 = __importDefault(require("./jobs"));
const router = express_1.default.Router();
router.use('/jobs', jobs_1.default);
router.get('/', (req, res) => {
    res.send("backend is working fine for index.js route inside routes folder");
});
exports.default = router;
