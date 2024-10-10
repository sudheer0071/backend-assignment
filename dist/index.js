"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const background_job_1 = require("./routes/background-job");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.PORT || 8080;
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send("backend is working fine");
});
app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
(0, background_job_1.backgroundJobs)();
