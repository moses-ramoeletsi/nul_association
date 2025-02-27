// /api/index.js
import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "../Backend/databaseConfig/databaseConnection.js";
import adminRoute from "../Backend/routes/admin.route.js";

dotenv.config();
const app = express();
app.use(express.json());

// Connect to database
dbConnection().catch(err => console.error("Database connection error:", err));

// Routes
app.use("/api", adminRoute);

// Export the Express app as the default export
export default app;