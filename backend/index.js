import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import data from "./models/dataModels.js";
import user from "./models/userModel.js";
import Login from "./models/loginModels.js";
import Jadwal from "./models/noteModels.js";
import dataRoute from "./routes/dataRoute.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import jadwalRoute from "./routes/jadwalRoute.js" 

import cors from "cors";

dotenv.config();
const app = express();

// Migrate DB otomatis
// (async () => {
//     await user.sync();
// })();


app.use(cors());

app.use(express.json());
app.use(userRoute);
app.use(authRoute);
app.use(dataRoute);
app.use(jadwalRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
