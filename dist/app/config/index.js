"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// import path from 'path'
dotenv_1.default.config();
// dotenv.config({ path: path.join((process.cwd(), '.env')) })
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
};
