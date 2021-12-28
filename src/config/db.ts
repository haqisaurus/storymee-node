import mongoose from "mongoose";
const mongoUrl: any = process.env.MONGO_DB;
export const connectDB = async () => {
    await mongoose.connect(mongoUrl);
};
