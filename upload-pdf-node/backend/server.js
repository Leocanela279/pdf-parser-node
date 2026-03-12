import express from "express";
import "dotenv/config";
import cors from "cors";
import fileRoutes from "./routes/file.route.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", fileRoutes);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port:${PORT}`);
});
