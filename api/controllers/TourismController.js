import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import { paths } from "../config/Paths.js";
import Category from "../models/categoryModel.js";
import Tourism from "../models/TourismModel.js";
import Users from "../models/userModel.js";
import { trackViewHandler } from "../utils/trackViewHandler.js";

export const trackView = async (req, res) => {
  trackViewHandler(req, res, Tourism);
};

export const getTourism = async (req, res) => {
  try {
    const tourism = await Tourism.findAll({
      order: [["id", "DESC"]],
      include: [Users],
    });
    res.json(tourism);
  } catch (error) {
    console.log(error);
  }
};

export const createTourism = async (req, res) => {
  const userId = jwt.decode(
    req.headers?.["authorization"]?.replace("Bearer ", "")
  ).userId;

  if (req.files == null) return res.json({ error: "عکسی انتخاب نکردید." });
  const file = req.files.file;

  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  let dateNow = Math.round(Date.now());
  const fileName = dateNow + ext;
  const url = `/api/uploads/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  if (!allowedType.includes(ext.toLowerCase())) {
    return res.json("عکس نامعتبر است ، فرمت مجاز .jpg .jpeg .png می باشد.");
  }
  if (fileSize > 3000000)
    return res.json("حجم عکس نباید بیشتر از 3 مگابایت باشد");
  const filePath = path.join(paths.publicDir, "images", fileName);
  //`./public/images/${fileName}`
  file.mv(filePath, async (err) => {
    if (err) return res.json({ msg: err.message });
    try {
      await Tourism.create({
        ...req.body,
        image: fileName,
        userId,
        url: url,
      });
      res.json({ msg: "مطلب با موفقیت بارگذاری شد." });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const getTourismById = async (req, res) => {
  try {
    const response = await Tourism.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email", "image"],
        },
      ],
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateTourism = async (req, res) => {
  const tourism = await Tourism.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!tourism) return res.json({ msg: "دیتایی وجود ندارد." });

  let fileName = "";
  if (req.files === null) {
    fileName = tourism.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    let dateNow = Math.round(Date.now());
    fileName = dateNow + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase())) {
      return res.json("عکس نامعتبر است ، فرمت مجاز .jpg .jpeg .png می باشد.");
    }
    if (fileSize > 3000000)
      return res.json("حجم عکس نباید بیشتر از 3 مگابایت باشد");
    const filePath = path.join(paths.publicDir, "images", tourism.image);
    //const filePath = `./public/images/${tourism.image}`;
    fs.unlinkSync(filePath);
    //`./public/images/${fileName}`
    file.mv(path.join(paths.publicDir, "images", fileName), async (err) => {
      if (err) return res.json({ msg: err.message });
    });
  }

  const url = `/api/uploads/images/${fileName}`;

  try {
    await Tourism.update(
      {
        ...req.body,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ msg: "مطلب با موفقیت ویرایش شد." });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTourism = async (req, res) => {
  const tourism = await Tourism.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!tourism) return res.status(404).json({ title: "این مطلب پیدا نشد." });
  try {
    const filePath = path.join(paths.publicDir, "images", tourism.image);
    // const filePath = `./public/images/${article.image}`;
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log(err);
    }
    await Tourism.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "مطلب با موفقیت حذف شد." });
  } catch (error) {
    console.log(error);
  }
};

export const getNewTourism = async (req, res) => {
  try {
    const tourism = await Tourism.findAll({
      limit: 20,
      order: [["id", "DESC"]],
      include: [Category],
    });
    res.json(tourism);
  } catch (error) {
    console.log(error);
  }
};

export const getLastTourism = async (req, res) => {
  try {
    const tourism = await Tourism.findAll({
      limit: 1,
      order: [["id", "DESC"]],
    });
    res.json(tourism);
  } catch (error) {
    console.log(error);
  }
};

export const getDetailTourism = async (req, res) => {
  try {
    const response = await Tourism.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email", "image"],
        },
      ],
    });
    const numViews = response.numViews + 1;
    await Tourism.update(
      { numViews },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const popularTourism = async (req, res) => {
  try {
    const tourism = await Tourism.findAll({
      limit: 4,
      order: [["numViews", "DESC"]],
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email", "url"],
        },
      ],
    });
    res.json(tourism);
  } catch (error) {
    console.log(error);
  }
};

export const getCatTourism = async (req, res) => {
  try {
    const hasCategory = req.query.cat;
    const tourism = hasCategory
      ? await Tourism.findAll({
          where: { catId: hasCategory },
          order: [["id", "DESC"]],
        })
      : await Tourism.findAll({
          order: [["id", "DESC"]],
        });
    res.json(tourism);
  } catch (error) {
    console.log(error);
  }
};
