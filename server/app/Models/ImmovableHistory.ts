import { DataTypes} from "sequelize";
import User from "./User";
const {sequelize} = require('../../database/database');

const ImmovableHistory = sequelize.define('ImmovableHistory', {
    userId: {
        type: DataTypes.BIGINT
    },
    action: {
        type: DataTypes.STRING,
        defaultValue:'Действие',
    },
    immovableId: {
        type: DataTypes.BIGINT,
        defaultValue:1,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: true,
    tableName: 'immovable_history',
});

ImmovableHistory.belongsTo(User, {foreignKey: 'userId'});

export default ImmovableHistory;
