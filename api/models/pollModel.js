import { DataTypes } from 'sequelize';
import db from "../config/Database.js";

const Poll = db.define('Poll', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'polls',
  timestamps: true,
});

const Response = db.define('Response', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  formData: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  tableName: 'responses',
  timestamps: true,
});

Poll.hasMany(Response, { foreignKey: 'pollId' });
Response.belongsTo(Poll, { foreignKey: 'pollId' });

export { Response, Poll };
