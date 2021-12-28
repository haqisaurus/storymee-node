import { validationResult } from "express-validator";
import { Post, User } from "../model/model";
import slugify from "slugify";
import { makeid } from "../config/util";

export async function getPostDetail(req: any, res: any) {
    const slug = req.params.slug;
    const post = await Post.findOne({ slug: slug });
    res.json(post);
}
export async function getMyPost(req: any, res: any) {
    const userID = req.app.get("userID");
    const posts = await Post.find({ "creator.userId": userID }).sort({ _id: -1 });
    res.json({
        page: 1,
        total: 0,
        content: posts,
    });
}
export async function postNewPost(req: any, res: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    let slug = slugify(body.title.toString().toLowerCase());
    const checkpost = await Post.count({ slug });
    if (checkpost > 0) {
        slug = slugify(body.title + " " + makeid(10));
    }
    const userID = req.app.get("userID");
    const currentUser = await User.findOne({ _id: userID });
    const creator = {
        userId: userID,
        username: currentUser.username,
        photo: currentUser.photo,
    };
    const post = new Post(body);
    post.title = body.title;
    post.content = body.content;
    post.privilage = body.privilage;
    post.type = "ARTICLE";
    post.status = "PUBLISHED";
    post.rating = 0;
    post.slug = slug;
    post.updatedAt = Date.now();
    post.creator = creator;
    post.mentions = [];
    post.allowComment = currentUser.postSetting?.allowComment || true;
    body.mentions.forEach((e: any) => {
        const mention = {
            userId: e.userID,
            username: e.username,
            photo: e.photo,
        };
        post.mentions.push(mention);
    });
    post.hashTags = [];
    body.hashTags.forEach((e: any) => {
        post.hashTags.push(e.trim());
    });
    await post.save();
    res.json({
        message: "Posted",
    });
}
