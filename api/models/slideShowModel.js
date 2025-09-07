import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const SlideShow = db.define("slideshow", {
    image:{
        type: DataTypes.STRING,
    },
    url: DataTypes.STRING
}, {
    freezeTableName: true,
})

export default SlideShow;