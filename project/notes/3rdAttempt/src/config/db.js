import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connection sucessfuly')
        
    } catch (error) {
        console.log("Database connection fail ",error.message)
    }
}

export default connectDB