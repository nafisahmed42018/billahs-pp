import mongoose from 'mongoose'
const dbConnect = async () => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await mongoose.connect(process.env.LOCAL_DB_URI)
      console.log('Local database is connected....')
    } else {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log('production database is connected....')
    }
  } catch (error) {
    console.log('database connection failed')
  }
}

export default dbConnect
