import { DataTypes} from "sequelize";
const {sequelize} = require('../../database/database');

const Role = sequelize.define('role', {
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
},{
    tableName: 'role',
    timestamps: true,
});

export default Role;
