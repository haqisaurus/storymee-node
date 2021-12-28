import bcrypt from "bcrypt";
import { transporter } from "../config/mailer";
import { makeid } from "../config/util";
import { User } from "../model/model";
import jwt from "jsonwebtoken";

export async function postLogin(req: any, res: any) {
    const body = req.body;
    let user: any = null as any;
    user = await User.findOne({ username: body.username, activated: true });
    if (!user) {
        return res.status(400).send({
            message: "Username not found please register",
        });
    }
    // hash password dengan salt
    const validPassword = await bcrypt.compare(body.password, user?.password);
    if (!validPassword) {
        return res.status(400).send({
            message: "Username and password doesn't match",
        });
    }
    const jwtSecret: any = process.env.JWT_SECRET;

    const token = jwt.sign({ userID: user.id }, jwtSecret, { expiresIn: "7d" });

    res.json({
        token,
        expiredAt: new Date()
    });
}

export async function postRegister(req: any, res: any) {
    const body = req.body;

    if (!(body.email && body.password)) {
        return res.status(400).send({
            message: "Username and password doesn't match",
        });
    }
    let countUser = await User.count({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (countUser > 0) {
        return res.status(400).send({
            message: "Username or email exist",
        });
    }
    // creating a new mongoose doc from user data
    const user = new User(body);
    // generate salt to hash password
    const hashSecret = bcrypt.genSaltSync(10);
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = await bcrypt.hash(user.password, hashSecret);
    user.activationKey = makeid(20);
    user.activated = false;
    user.postSetting = {
        privilage: "ONLY_FOLLOWER",
        allowComment: true,
    };
    user.userSetting = {
        privilage: "ONLY_LOGGED_IN",
    };
    await user.save();
    const mailData = {
        from: "noreply@storymee.com", // sender address
        to: user.email, // list of receivers
        subject: "Activating account",
        html: "<b>Hey there! </b> <br> Activate your account here " + user.activationKey + "<br/>",
    };
    transporter.sendMail(mailData, function (err: any, info: any) {
        if (err) console.log(err);
        else console.log(info);
    });

    return res.json({
        message: "User registered",
    });
}
