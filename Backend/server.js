import express from 'express';
import dotenv from "dotenv"
import userRoute from "./routers/userRoute.js"
import productRoute from "./routers/productRoute.js"
import dashboardRoute from "./routers/dashboardRoute.js"
import uploadRoute from "./routers/uploadRoute.js"
import mongoose from 'mongoose';
import cors from "cors";

const app = express();
dotenv.config();

//mongoose connect
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("database is connected successfully"))
.catch((e)=>console.log("db is not connected"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true    
}));
app.use("/uploads", express.static("uploads"));


// routing
app.use("/api/",userRoute);
app.use("/api/products/",productRoute)
app.use("/api/dashboard/",dashboardRoute)
app.use("/api/upload-image",uploadRoute)

app.listen(process.env.PORT,()=>{
    console.log("server started");
})


