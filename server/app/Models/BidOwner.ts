import { DataTypes } from "sequelize";
import User from "./User";
const { sequelize } = require('../../database/database');

const BidOwner = sequelize.define('owner_bid', {
    userId: {
        type: DataTypes.INTEGER
    },
    fio: {
        type: DataTypes.STRING
    },
    registrationCertificate: {
        type: DataTypes.STRING
    },
    fsId: {
        type: DataTypes.BIGINT,
    },
    immovableId: {
        type: DataTypes.BIGINT,
    },
    regDate: {
        type: DataTypes.DATE,
    },
    timestamps: true,
    tableName: 'owner_bid',
});

BidOwner.belongsTo(User, { foreignKey: 'userId' });
BidOwner.hasMany(BidOwner, { foreignKey: 'immovableId', as: 'history' });

export default BidOwner;
