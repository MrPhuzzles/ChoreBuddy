const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Relation extends Model {}

Relation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    review_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'reviews',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'relation',
    timestamps: false
  }
);

module.exports = Relation;