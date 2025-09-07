import Category from "../models/categoryModel.js";
import Write from "../models/articleModel.js";
import { fileUploadHandler } from "../utils/fileUploadHandler.js";
import { setCookie } from "../utils/setCookie.js";
import jwt from "jsonwebtoken";

import Users from "../models/userModel.js";

export const getCategory = async ({ params }, res) => {
  const where = params?.id ? { id: params?.id } : { slug: params?.slug };

  try {
    const categories = await Category.findOne({
      where,
    });

    res.json(categories);
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async (req, res) => {
  //   const { showOnNavbar } = req.query;

  let where = {};

  //   if (!isNaN(showOnNavbar)) where = { showOnNavbar };

  try {
    const categories = await Category.findAll({
      //   order: [["DESC"]],
      where,
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryHome = async (req, res) => {
  try {
    const categories = await Category.findAll({
      limit: 4,
      //   order: [["id", "DESC"]],
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async (req, res) => {
  const { body = {} } = req;

  try {
    await Category.create({
      name: body.name,
      slug: body.slug?.toLowerCase(),
      // parentId: body.parentId === '' ? null : body.parentId,
      //   showOnNavbar: body.showOnNavbar,
    });
    res.json({ title: "دسته بندی افزوده شد." });
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (req, res) => {
  const { body = {} } = req;
  const filePath = await fileUploadHandler({
    file: req.files?.image,
    maxFileSize: 20000000,
  });

  try {
    await Category.update(
      {
        name: body.name,
        slug: body.slug?.toLowerCase(),
        image: filePath,
        // parentId: body.parentId === '' ? null : body.parentId,
        // showOnNavbar: body.showOnNavbar,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.json({ title: "ویرایش با موفقیت انجام شد." });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ title: "حذف دسته بندی موفقیت آمیز بود." });
  } catch (error) {
    let errMsg = "";

    if (error?.original?.code === "ER_ROW_IS_REFERENCED_2") {
      const referencedItems = await Write.findAll({
        where: {
          catId: req.params.id,
        },
        attributes: ["title"],
      });
      errMsg = `دسته بندی مورد نظر در مقالات \`${referencedItems
        .map((v) => v.title)
        .join(", ")}\` مورد استفاده قرار گرفته است.`;
    } else {
      errMsg = error?.original?.sqlMessage;
    }
    res.status(403).json({ title: errMsg });
  }
};
