import fs from "fs";
import path from "path";
import { paths } from "../config/Paths.js";
import Advertising from "../models/AdvertisingModel.js";
import Category from "../models/categoryModel.js";
import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const getAdvertising = async (req, res) => {
  try {
    const advertising = await Advertising.findAll({
      order: [["id", "DESC"]],
      include: [Users],
    });
    res.json(advertising);
  } catch (error) {
    console.log(error);
  }
};

export const createAdvertising = async (req, res) => {
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
      await Advertising.create({
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

export const getAdvertisingById = async (req, res) => {
  try {
    const response = await Advertising.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateAdvertising = async (req, res) => {
  const advertising = await Advertising.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!advertising) return res.json({ msg: "دیتایی وجود ندارد." });

  let fileName = "";
  if (req.files === null) {
    fileName = advertising.image;
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
    const filePath = path.join(paths.publicDir, "images", advertising.image);
    //const filePath = `./public/images/${Advertising.image}`;
    fs.unlinkSync(filePath);
    //`./public/images/${fileName}`
    file.mv(path.join(paths.publicDir, "images", fileName), async (err) => {
      if (err) return res.json({ msg: err.message });
    });
  }

  const url = `/api/uploads/images/${fileName}`;

  console.log(req.body);
  try {
    await Advertising.update(
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

export const deleteAdvertising = async (req, res) => {
  const advertising = await Advertising.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!advertising)
    return res.status(404).json({ title: "این مطلب پیدا نشد." });
  try {
    const filePath = path.join(paths.publicDir, "images", advertising.image);
    // const filePath = `./public/images/${article.image}`;
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log(err);
    }
    await Advertising.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "مطلب با موفقیت حذف شد." });
  } catch (error) {
    console.log(error);
  }
};

export const getLastAdvertising = async (req, res) => {
  try {
    const advertising = await Advertising.findAll({
      limit: 5,
      order: [["id", "DESC"]],
      include: [Category],
    });
    res.json(advertising);
  } catch (error) {
    console.log(error);
  }
};

export const getDetailAdvertising = async (req, res) => {
  try {
    const response = await Advertising.findOne({
      where: {
        id: req.params.id,
      },
    });
    const numViews = response.numViews + 1;
    await Advertising.update(
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

export const popularAdvertising = async (req, res) => {
  try {
    const advertising = await Advertising.findAll({
      limit: 4,
      order: [["numViews", "DESC"]],
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email", "url"],
        },
      ],
    });
    res.json(advertising);
  } catch (error) {
    console.log(error);
  }
};

export const getCatAdvertising = async (req, res) => {
  try {
    const hasCategory = req.query.cat;
    const advertising = hasCategory
      ? await Advertising.findAll({
          where: { catId: hasCategory },
          order: [["id", "DESC"]],
        })
      : await Advertising.findAll({
          order: [["id", "DESC"]],
        });
    res.json(advertising);
  } catch (error) {
    console.log(error);
  }
};
