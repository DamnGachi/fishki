import { DataTypes } from "sequelize";
import User from "./User";
const { sequelize } = require('../../database/database');

const BidOwner = sequelize.define('OwnerBid', {
    id: {
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
    tableName: 'BidOwner',
});

BidOwner.belongsTo(User, { foreignKey: 'userId' });
BidOwner.hasMany(BidOwner, { foreignKey: 'immovableId', as: 'history' });

export default BidOwner;
