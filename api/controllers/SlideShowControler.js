import fs from "fs";
import path from "path";
import { paths } from "../config/Paths.js";
import SlideShow from "../models/slideShowModel.js";

export const getAllSlideShow = async (req, res) => {
    try {
        const slideshow = await SlideShow.findAll({});
        res.json(slideshow)
    } catch (error) {
        console.log(error);
    }
}

export const createSlideShow = async (req, res) => {
    if (req.files == null) return res.status(400).json({ title: "عکس انتخاب نکردید." })
    const file = req.files?.file
    const fileSize = file?.data?.length;
    const ext = path.extname(file?.name)
    let dateNow = Math.round(Date.now());
    const fileName = dateNow + ext
    const url = `/api/uploads/images/${fileName}`
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(400).json({ title: "عکس نامعتبر است ، فرمت مجاز .jpg .jpeg .png می باشد." })
    }
    if (fileSize > 3000000) return res.status(400).json({ title: "حجم عکس نباید بیشتر از 3 مگابایت باشد" })

    file.mv(path.join(paths.publicDir, 'images', fileName), async (err) => {
        if (err) return res.status(400).json({ title: err.message })
        try {
            await SlideShow.create({ image: fileName, url: url })
            res.json({ title: "عکس افزوده شد." })
        } catch (error) {
            console.log(err.message);
        }
    })

}

export const getSlideShow = async (req, res) => {
    try {
        const slideshow = await SlideShow.findAll({
            order: [["createdAt", "DESC"]]
        });
        res.json(slideshow)
    } catch (error) {
        console.log(error);
    }
}

export const deleteSlideShow = async (req, res) => {
    const slideshow = await SlideShow.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!slideshow) return res.status(400).json({ title: "عکس پیدا نشد." })

    try {
        const filePath = path.join(paths.publicDir, 'images', slideshow.image);
        // const filePath = `./public/images/${slideshow.image}`
        
        try {
            fs.unlinkSync(filePath)
        } catch(err) {
            console.log(err);
        }

        await SlideShow.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({ title: "عکس با موفقیت حذف شد." })
    } catch (error) {
        console.log(error);
    }
}