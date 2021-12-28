import { Post, User } from "../model/model";
export async function index(req: any, res: any) {
    res.render("index", {
        cheese: "munster",
        bread: "wheat",
    });
}
export async function getGenerateSiteMap(req: any, res: any) {
    const posts = await Post.find();
    const response = posts.map((post: any) => {
        return {
            url: `/@${post.creator?.username}/article/${post.slug}`,
            updatedAt: post.updatedAt,
        };
    });

    res.json(response);
}
