import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Category = db.define(
  "category",
  {
    // parentId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    name: {
      type: DataTypes.STRING,
    },
    // showOnNavbar: {
    //   type: DataTypes.INTEGER,
    // },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Category;
