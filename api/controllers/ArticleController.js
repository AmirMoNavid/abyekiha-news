import News from "../models/articleModel.js";
import path from "path";
import fs from "fs";
import Users from "../models/userModel.js";
import { paths } from "../config/Paths.js";
import jwt from "jsonwebtoken";
import Category from "../models/categoryModel.js";
import { trackViewHandler } from "../utils/trackViewHandler.js";

export const trackView = async (req, res) => {
  trackViewHandler(req, res, News);
};

export const getArticle = async (req, res) => {
  const {
    limit: limitStr,
    select,
    count,
    orderBy,
    orderType,
    showOnLists,
  } = req.query;

  if (!isNaN(count)) {
    const articlesCount = await News.count();
    return res.send(articlesCount.toString());
  }

  const limit = isNaN(limitStr) ? undefined : Number(limitStr);
  let order = [["id", "DESC"]];

  if (limitStr && isNaN(limit))
    return res.status(400).json(`Invalid Limit: ${limitStr}`);

  if (orderBy && orderBy.trim() !== "")
    order = [[orderBy, orderType ?? "DESC"]];

  try {
    const article = await News.findAll({
      limit,
      order,
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email", "image"],
        },
      ],
      ...(select ? { attributes: select.split(",") } : {}),
    });
    res.json(article);
  } catch (error) {
    console.log(error);
  }
};

export const createArticle = async (req, res) => {
  if (req.files == null)
    return res.status(404).json({ title: "عکسی انتخاب نکردید." });
  const { title, desc, shortDesc, catId } = req.body;
  const file = req.files?.file;

  const userId = jwt.decode(
    req.headers?.["authorization"]?.replace("Bearer ", "")
  ).userId;

  const fileSize = file?.data?.length;
  const ext = path.extname(file?.name);
  let dateNow = Math.round(Date.now());
  const fileName = dateNow + ext;
  const url = `/api/uploads/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg", ".webp"];
  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(400).json({
      title: "عکس نامعتبر است ، فرمت مجاز .jpg .jpeg .webp .png می باشد.",
    });
  }
  if (fileSize > 3000000)
    return res
      .status(400)
      .json({ title: "حجم عکس نباید بیشتر از 3 مگابایت باشد" });

  const filePath = path.join(paths.publicDir, "images", fileName);
  // `./public/images/${fileName}`
  file.mv(filePath, async (err) => {
    if (err) return res.status(400).json({ title: err.message });
    try {
      await News.create({
        title: title,
        desc: desc,
        shortDesc: shortDesc,
        catId: catId,
        userId: userId,
        image: fileName,
        url: url,
      });
      res.json({ title: "مطلب با موفقیت بارگذاری شد." });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const getArticleById = async (req, res) => {
  try {
    const response = await News.findOne({
      where: {
        id: req.params.id,
      },
      include: [Users],
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getArticleByCatId = async (req, res) => {
  try {
    const response = await News.findAll({
      where: {
        catId: req.params.catId,
      },
      include: [Category],
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateArticle = async (req, res) => {
  const article = await News.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!article) return res.status(400).json({ title: "دیتایی وجود ندارد." });

  let fileName = "";
  if (req.files === null) {
    fileName = article.image;
  } else {
    const file = req.files?.file;
    const fileSize = file?.data?.length;
    const ext = path.extname(file?.name);
    let dateNow = Math.round(Date.now());
    fileName = dateNow + ext;
    const allowedType = [".png", ".jpg", ".jpeg", ".webp"];
    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(400).json({
        title: "عکس نامعتبر است ، فرمت مجاز .jpg .jpeg .webp .png می باشد.",
      });
    }
    if (fileSize > 3000000)
      return res
        .status(400)
        .json({ title: "حجم عکس نباید بیشتر از 3 مگابایت باشد" });

    const filePath = path.join(paths.publicDir, "images", article.image);
    // const filePath = `./public/images/${article.image}`;

    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log(err);
    }
    // `./public/images/${fileName}`
    file.mv(path.join(paths.publicDir, "images", fileName), async (err) => {
      if (err) return res.status(400).json({ title: err.message });
    });
  }

  const title = req.body.title;
  const desc = req.body.desc;
  const shortDesc = req.body.shortDesc;
  const catId = req.body.catId;
  const userId = jwt.decode(
    req.headers?.["authorization"]?.replace("Bearer ", "")
  ).userId;
  const url = `/api/uploads/images/${fileName}`;

  try {
    await News.update(
      {
        title: title,
        desc: desc,
        shortDesc: shortDesc,
        catId: catId,
        userId: userId,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json({ title: "مطلب با موفقیت ویرایش شد." });
  } catch (error) {
    console.log(error);
  }
};

export const deleteArticle = async (req, res) => {
  const article = await News.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!article) return res.status(404).json({ title: "این مطلب پیدا نشد." });
  try {
    const filePath = path.join(paths.publicDir, "images", article.image);
    // const filePath = `./public/images/${article.image}`;
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.log(err);
    }
    await News.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ title: "مطلب با موفقیت حذف شد." });
  } catch (error) {
    console.log(error);
  }
};

export const getLatestArticles = async (req, res) => {
  try {
    const article = await News.findAll({
      limit: 7,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email", "image"],
        },
        {
          model: Category,
          attributes: ["id", "name", "slug"],
        },
      ],
    });
    res.json(article);
  } catch (error) {
    console.log(error);
  }
};

export const getShahrdariArticle = async (req, res) => {
  try {
    const article = await News.findOne({
      where: { id: 32 },
    });
    res.json(article);
  } catch (error) {
    console.log(error);
  }
};

export const getCatArticle = async (req, res) => {
  try {
    const hasCategory = req.query.cat;
    const article = hasCategory
      ? await News.findAll({
          where: {
            catId: hasCategory,
          },
          order: [["id", "DESC"]],
          include: [
            {
              model: Users,
              attributes: ["id", "name", "email", "url"],
            },
          ],
        })
      : await News.findAll({
          limit: 4,
          order: [["id", "DESC"]],
          include: [
            {
              model: Users,
              attributes: ["id", "name", "email", "url"],
            },
          ],
        });
    res.json(article);
  } catch (error) {
    console.log(error);
  }
};
