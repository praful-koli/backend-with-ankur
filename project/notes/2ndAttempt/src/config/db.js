import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connection successfuly')
    } catch (error) {
        console.log('Database conntion fail')
    }
}


export default connectDB