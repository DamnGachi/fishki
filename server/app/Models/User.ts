import { DataTypes} from "sequelize";
import Role from "./Role";
const {sequelize} = require('../../database/database');

const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    slug: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.BIGINT,
    phone: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
}, {
    timestamps: true,
    tableName: 'users',
});

User.belongsTo(Role);

export default User;
