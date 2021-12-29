import mongoose from "mongoose";
const postSetting = new mongoose.Schema({ privilage: "string", allowComment: Boolean });
const userSetting = new mongoose.Schema({ privilage: "string" });

const user = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    photo: String,
    activated: Boolean,
    activationKey: String,
    description: String,
    followings: [mongoose.Types.ObjectId],
    followers: [mongoose.Types.ObjectId],
    userSetting: userSetting,
    postSetting: postSetting,
});
export const User = mongoose.model("User", user);
const creator = new mongoose.Schema({ userId: mongoose.Types.ObjectId, username: "string", photo: String });
const comment = new mongoose.Schema({ username: String, comment: String, likes: [mongoose.Types.ObjectId], dislikes: [mongoose.Types.ObjectId] });
const mention = new mongoose.Schema({ userId: mongoose.Types.ObjectId, username: "string", photo: String, count: Number });
const cordinate = new mongoose.Schema({ longitude: mongoose.Types.Decimal128, latitude: mongoose.Types.Decimal128 });
const post = new mongoose.Schema({
    title: String,
    content: String,
    privilage: String,
    type: String,
    status: String,
    slug: String,
    rating: mongoose.Types.Decimal128,
    creator: creator,
    images: [String],
    hashTags: [String],
    mentions: [mention],
    coordinate: cordinate,
    serialID: mongoose.Types.ObjectId,
    previousPostID: mongoose.Types.ObjectId,
    comments: [comment],
    allowComment: Boolean,
    likes: [mongoose.Types.ObjectId],
    dislikes: [mongoose.Types.ObjectId],
    updatedAt: { type: Date },
});
export const Post = mongoose.model("Post", post);
const serial = new mongoose.Schema({
    title: String,
    privilage: String,
    rating: mongoose.Types.Decimal128,
    category: [String],
    cover: String,
    synopsis: String,
    caracters: [mention],
});
export const Serial = mongoose.model("Serial", serial);
