import mongoose from "mongoose";
const mongoUrl: any = process.env.MONGO_DB;
console.log(mongoUrl);
export const connectDB = async () => {
    await mongoose.connect(mongoUrl);
};
