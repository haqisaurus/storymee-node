import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: "youremail@gmail.com",
        pass: "password",
    },
    secure: true,
});
