import cloudinary from "cloudinary";
import streamifier from "streamifier";
cloudinary.v2.config({
    cloud_name: "haqisaurus",
    api_key: "216436939798638",
    api_secret: "TcrT09ofGzuIvju9TxE8lDgouhw",
    secure: true,
});
export async function postMedia(req: any, res: any) {
    let streamUpload = (req: any) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.v2.uploader.upload_stream((error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
    let result: any = null as any;
    try {
        result = await streamUpload(req);
        console.log(result);
    } catch (error) {
        console.log(error);
        res.json({
            uploaded: 0,
            error: {
                message: error,
            },
        });
    }
    res.json({
        uploaded: 1,
        fileName: result.public_id + "." + result.format,
        url: result.secure_url,
    });
}
