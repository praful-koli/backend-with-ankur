import app from "./src/app.js";
import connectDB from "./src/config/db.js";
await connectDB()
app.listen(3000, ()=> {
    console.log('Server Running on port 3000')
})