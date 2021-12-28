import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoUrl: any = process.env.MONGO_DB;
    await mongoose.connect(mongoUrl);
};
