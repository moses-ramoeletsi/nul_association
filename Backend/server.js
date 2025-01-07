import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./databaseConfig/databaseConnection.js";
import adminRoute from "./routes/admin.route.js";
import path from "path"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();  

app.use(express.json());
app.use("/api", adminRoute);

// Development static file serving
if(process.env.NODE_ENV !== "production"){
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data:");
  next();
});

app.listen(PORT, () => {
  dbConnection();
  console.log("Server running on port: " + PORT);
});
