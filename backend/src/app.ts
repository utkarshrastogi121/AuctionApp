import express from "express"
import itemRoutes from "./routes/item.routes"

const app=express();
app.use(itemRoutes);

export default app;