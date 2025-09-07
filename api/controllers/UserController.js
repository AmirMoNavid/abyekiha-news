import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import ConfigPort from "../config/ConfigPort.js";
import { paths } from "../config/Paths.js";
import Users from "../models/userModel.js";
import { fileUploadHandler } from "../utils/fileUploadHandler.js";

export const getAllUsers = async (req, res) => {
  const { count } = req.query;

  if (!isNaN(count)) {
    const usersCount = await Users.count();
    return res.send(usersCount.toString());
  }

  try {
    const users = await Users.findAll({
      order: [["id", "DESC"]],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params?.id,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const filePath = await fileUploadHandler({
    allowedTypes: "images",
    destinationPath: "/avatars",
    file: req.files?.file,
    maxFileSize: 20000000,
  });
  const { name, email, password, isAdmin } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const found = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (found) {
      return res.status(401).json({ title: "ایمیل تکراری می باشد." });
    }
    await Users.create({
      name,
      email,
      password: hashPassword,
      isAdmin,
      image: filePath,
    });
    res.json({
      message: "ثبت نام موفقیت آمیز بود",
    });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(400).json({ title: "پسورد اشتباه است" });
    }
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const isAdmin = user[0].isAdmin;
    const accessToken = jwt.sign(
      {
        userId,
        name,
        email,
        isAdmin,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "45s" }
    );
    const refreshToken = jwt.sign(
      {
        userId,
        name,
        email,
        isAdmin,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update(
      { refresh_token: refreshToken },
      { where: { id: userId } }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      // domain: new URL(ConfigPort.allowedDomains).hostname,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      name,
      email,
      isAdmin,
      accessToken,
      title: "شما با موفقیت وارد شدید",
    });
  } catch (error) {
    res.status(404).json({ title: "کاربری با این ایمیل وجود ندارد." });
  }
};

export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).json({ title: "توکن پیدا نشد" });
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.status(404).json({ title: "کاربر پیدا نشد" });
    const clr = null;
    await Users.update(
      {
        refresh_token: clr,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.clearCookie("refreshToken");
    res.json({ title: "خارج شدید" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user)
    return res.status(404).json({
      message: "این کاربر پیدا نشد",
    });
  try {
    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "کاربر با موفقیت حذف شد",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const filePath = await fileUploadHandler({
    allowedTypes: "images",
    destinationPath: "/avatars",
    file: req.files?.file,
    maxFileSize: 20000000,
  });
  const {
    name,
    email,
    password,
    // confPassword,
    isAdmin,
  } = req.body;
  // if (password !== confPassword) {
  //     return res.json({
  //         title: "پسورد و تکرار آن برابر نیستند."
  //     })
  // }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.update(
      {
        name,
        email,
        password: hashPassword,
        isAdmin,
        image: filePath,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.json({
      message: "ویرایش انجام شد.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  const avatar = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!avatar)
    return res.status(404).json({
      title: "کاربری یافت نشد.",
    });

  let fileName = "";
  if (req.files === null) {
    fileName = avatar.image;
  } else {
    const file = req.files?.file;
    const fileSize = file?.data?.length;
    const ext = path.extname(file?.name);
    let dateNow = Math.round(Date.now());
    fileName = dateNow + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase())) {
      return res.json("عکس معتبر نیست * فرمت های مجاز jpg jpeg png");
    }
    if (fileSize > 5000000)
      return res.json("حجم عکس نباید بیشتر از 5مگابایت باشد.");

    if (avatar.image) {
      const filePath = path.join(paths.publicDir, "avatars", avatar.image);
      //const filePath = `./public/avatars/${avatar.image}`
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.log(err);
      }
    }

    const filePath = path.join(paths.publicDir, "avatars", fileName);
    file.mv(filePath, (err) => {
      if (err)
        return res.status(400).json({
          title: err.message,
        });
    });
  }

  const { name, password, confPassword } = req.body;

  if (password !== confPassword) {
    return res.json({
      title: "پسورد و تکرار آن باهم برابر نیست.",
    });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const url = `/api/uploads/avatars/${fileName}`;

  try {
    await Users.update(
      {
        name: name,
        password: hashPassword,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json("کاربر با موفقیت ویرایش شد.");
  } catch (error) {
    console.log(error);
  }
};

export const Profile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByPk(id);
    if (user) {
      res.json({
        id: user.id,
        name: user.name,
        image: user.image,
      });
    } else {
      res.status(404).json({
        title: "کاربر پیدا نشد",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
