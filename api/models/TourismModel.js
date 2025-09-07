import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./userModel.js";
import Category from "./categoryModel.js";

const { DataTypes } = Sequelize;

const Tourism = db.define(
  "tourism",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    numViews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    shortDesc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasMany(Tourism);
Tourism.belongsTo(Users, { foreignKey: "userId" });

export default Tourism;
