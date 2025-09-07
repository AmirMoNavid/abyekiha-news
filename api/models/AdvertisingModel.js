import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./userModel.js";
import Category from "./categoryModel.js";

const { DataTypes } = Sequelize;

const Advertising = db.define(
  "advertising",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
    },

    url: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Advertising);
Advertising.belongsTo(Users, { foreignKey: "userId" });

export default Advertising;
