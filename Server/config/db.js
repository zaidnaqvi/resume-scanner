import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    console.error("Error Details:", error);
    if (error.name === 'MongoServerError' && error.code === 8000) {
      console.error("Authentication failed. Please check your MongoDB URI and credentials.");
    }
    process.exit(1);
  }
};

export default connectDB;
