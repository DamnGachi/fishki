'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deportation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Deportation.init({
    slug: DataTypes.STRING,
    shortName: DataTypes.STRING,
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    typeId: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'deportation',
  });
  return Deportation;
};
