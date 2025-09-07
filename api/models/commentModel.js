import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Write from "./articleModel.js";

const { DataTypes } = Sequelize;

const Comments = db.define(
  "comments",
  {
    newsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);

// Write.hasMany(Comments);
// Comments.belongsTo(Write, { foreignKey: "newsId" });

export default Comments;
