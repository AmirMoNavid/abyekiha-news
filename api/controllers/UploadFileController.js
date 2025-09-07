import { fileUploadHandler } from "../utils/fileUploadHandler.js";

export const uploadFile = async (req, res) => {
    try {
        const filePath = await fileUploadHandler({
            file: req.files.file,
            maxFileSize: 20000000
        })
        res.json({ filePath });
    } catch(err) {
        console.log(err);
        res.status(400).json({ title: err })
    }
}