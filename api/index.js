import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from "../Backend/databaseConfig/databaseConnection.js";
import adminRoute from "../Backend/routes/admin.route.js";

// Setup express
dotenv.config();
const app = express();
app.use(express.json());

// Add a simple test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Your regular routes
app.use("/api", adminRoute);

// Try to connect to database
try {
  dbConnection();
} catch (error) {
  console.error("Database connection error:", error);
}

// Serverless handler
export default async function handler(req, res) {
  return app(req, res);
}