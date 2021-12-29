import { getGenerateSiteMap, index } from "../controller";
import { postLogin, postRegister } from "../controller/auth";
import { getHome } from "../controller/home";
import { getMyPost, getPostDetail, getPostDetailID, postNewPost } from "../controller/post";
import { getProfile, getSetting } from "../controller/user";
import { isAuth } from "./middleware";
import { body } from "express-validator";
import { postMedia } from "../controller/media";
import multer from "multer";
var upload = multer();
export function router(app: any) {
    app.post("/api/v1/login", postLogin);
    app.post("/api/v1/register", postRegister);
    app.get("/api/v1/post/:slug", getPostDetail);
    app.post(
        "/api/v1/post",
        isAuth,
        body("title").isLength({ min: 1 }).withMessage("Title must be filled"),
        body("content").isLength({ min: 1 }).withMessage("Content must be filled"),
        body("privilage").isLength({ min: 1 }),
        postNewPost
    );
    app.get("/api/v1/my-posts", isAuth, getMyPost);
    app.get("/api/v1/post/:postID/id", isAuth, getPostDetailID);
    app.post("/api/v1/media", isAuth, upload.single("file"), postMedia);
    app.get("/api/v1/sitemap", getGenerateSiteMap);
    app.get("/", index);
    app.get("/home", getHome);
    app.get("/:username", getProfile);
    app.get("/:username/about", getProfile);
    app.get("/:username/setting", isAuth, getSetting);
    app.get("/:username/article/:postId/:slug", () => "asdf");
}
