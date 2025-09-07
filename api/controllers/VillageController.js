import fs from "fs";
import path from "path";
import { paths } from "../config/Paths.js";
import Category from "../models/categoryModel.js";
import Users from "../models/userModel.js";
import Village from "../models/VillageModel.js";
import jwt from "jsonwebtoken";
import { trackViewHandler } from "../utils/trackViewHandler.js";

export const trackView = async (req, res) => {
  trackViewHandler(req, res, Village);
};

export const getVillage = async (req, res) => {
  try {
    const village = await Village.findAll({
      order: [["id", "DESC"]],
      include: [Users],
    });
    res.json(village);
  } catch (error) {
    console.log(error);
  }
};

export const createVillage = async (req, res) => {
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
      await Village.create({
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

export const getVillageById = async (req, res) => {
  try {
    const response = await Village.findOne({
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

export const updateVillage = async (req, res) => {
  const village = await Village.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!village) return res.json({ msg: "دیتایی وجود ندارد." });

  let fileName = "";
  if (req.files === null) {
    fileName = village.image;
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
    const filePath = path.join(paths.publicDir, "images", village.image);
    //const filePath = `./public/images/${village.image}`;
    fs.unlinkSync(filePath);
    //`./public/images/${fileName}`
    file.mv(path.join(paths.publicDir, "images", fileName), async (err) => {
      if (err) return res.json({ msg: err.message });
    });
  }

  const url = `/api/uploads/images/${fileName}`;

  try {
    await Village.update(
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

export const deleteVillage = async (req, res) => {
  const village = await Village.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!village) return res.status(404).json({ title: "این مطلب پیدا نشد." });
  try {
    const filePath = path.join(paths.publicDir, "images", village.image);
    // const filePath = `./public/images/${article.image}`;
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log(err);
    }
    await Village.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "مطلب با موفقیت حذف شد." });
  } catch (error) {
    console.log(error);
  }
};

export const getNewVillage = async (req, res) => {
  try {
    const village = await Village.findAll({
      limit: 20,
      order: [["id", "DESC"]],
      include: [Category],
    });
    res.json(village);
  } catch (error) {
    console.log(error);
  }
};

export const getLastVillage = async (req, res) => {
  try {
    const village = await Village.findAll({
      limit: 1,
      order: [["id", "DESC"]],
    });
    res.json(village);
  } catch (error) {
    console.log(error);
  }
};

export const getDetailVillage = async (req, res) => {
  try {
    const response = await Village.findOne({
      where: {
        id: req.params.id,
      },
    });
    const numViews = response.numViews + 1;
    await Village.update(
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

export const popularVillage = async (req, res) => {
  try {
    const village = await Village.findAll({
      limit: 4,
      order: [["numViews", "DESC"]],
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email", "url"],
        },
      ],
    });
    res.json(village);
  } catch (error) {
    console.log(error);
  }
};

export const getCatVillage = async (req, res) => {
  try {
    const hasCategory = req.query.cat;
    const village = hasCategory
      ? await Village.findAll({
          where: { catId: hasCategory },
          order: [["id", "DESC"]],
        })
      : await Village.findAll({
          order: [["id", "DESC"]],
        });
    res.json(village);
  } catch (error) {
    console.log(error);
  }
};
