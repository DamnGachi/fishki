import { DataTypes } from "sequelize";
import Owners from "./Owner";
import BidOwner from "./BidOwner";
const { sequelize } = require('../../database/database');

const Bid = sequelize.define('Bid', {
    slug: {
        type: DataTypes.STRING
    },
    cadastralNumber: {
        type: DataTypes.STRING,
    },
    region: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    cadastralArea: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    addressDoc: {
        type: DataTypes.STRING,
    },
    indexMail: {
        type: DataTypes.STRING,
    },
    space: {
        type: DataTypes.FLOAT,
    },
    floor: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.STRING,
    },

    actionTypeId: {
        type: DataTypes.STRING,
    },
    comment: {
        type: DataTypes.STRING,
    },

    statusId: {
        type: DataTypes.BIGINT,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: true,
    tableName: 'Bid',
});

Bid.hasMany(BidOwner);

export default Bid;
