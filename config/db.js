const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try{
        await mongoose.connect(URI);
        console.log("Database Connected");
        }catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(0);
    }
}
module.exports = connectDB;

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('Failed to connect to MongoDB', err);
//     process.exit(1);
//   }
// };


