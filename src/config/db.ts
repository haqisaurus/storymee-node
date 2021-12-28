import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/storymee");
    // await mongoose.connect(
    //     "mongodb://storymee:tekanenter@cluster0-shard-00-00.lz19i.mongodb.net:27017,cluster0-shard-00-01.lz19i.mongodb.net:27017,cluster0-shard-00-02.lz19i.mongodb.net:27017/storymee?ssl=true&replicaSet=atlas-ifjf71-shard-0&authSource=admin&retryWrites=true&w=majority"
    // );
};
