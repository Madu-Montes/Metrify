"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const db_1 = require("./config/db");
const measures_routes_1 = __importDefault(require("./routes/measures.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_1.connectDB)();
app.use("/api/auth", auth_routes_1.default);
app.use("/api/measures", measures_routes_1.default);
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
