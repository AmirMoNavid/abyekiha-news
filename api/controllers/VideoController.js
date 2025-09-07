import fs from "fs";
import path from "path";
import { paths } from "../config/Paths.js";
import Video from "../models/VideoModel.js";

export const getAllVideo = async (req, res) => {
  try {
    const videos = await Video.findAll({
      order: [["id", "DESC"]],
    });
    res.json(videos);
  } catch (error) {
    console.log(error);
  }
};

export const createVideo = async (req, res) => {
  if (req.files == null) return res.json({ error: "ویدئو انتخاب نکردید." });

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  let dateNow = Math.round(Date.now());
  const fileName = dateNow + ext;
  const url = `/api/uploads/videos/${fileName}`;
  const allowedType = [".mp4"];

  if (!allowedType.includes(ext.toLowerCase())) {
    return res.json({ error: "ویدئو نامعتبر است ، فرمت مجاز mp4 می باشد." });
  }
  if (fileSize > 20000000)
    return res.json({ error: "حجم فیلم نباید بیشتر از 20 مگابایت باشد" });

  const filePath = path.join(paths.publicDir, "videos", fileName);
  //`./public/videos/${fileName}`
  file.mv(filePath, async (err) => {
    if (err) return res.json({ msg: err.message });
    try {
      await Video.create({ video: fileName, url: url });
      res.json({ msg: "ویدئو افزوده شد." });
    } catch (error) {
      console.log(err.message);
    }
  });
};

export const getSingleVideo = async (req, res) => {
  try {
    const video = await Video.findOne({ order: [["createdAt", "DESC"]] });
    res.json(video);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideo = async (req, res) => {
  const video = await Video.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!video) return res.json({ msg: "ویدئو پیدا نشد." });

  try {
    const filePath = path.join(paths.publicDir, "videos", video.video);
    //const filePath = `./public/videos/${video.video}`
    fs.unlinkSync(filePath);
    await Video.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ msg: "ویدئو با موفقیت حذف شد." });
  } catch (error) {
    console.log(error);
  }
};
