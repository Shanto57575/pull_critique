import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const mongoConnection = mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB Connected! connection HOST : ', (await mongoConnection).connection.host)
    } catch (error) {
        console.log(`MongoDB connection Failed : `, error)
    }
}

export default connectDB;