import { DataTypes } from "sequelize";
const { sequelize } = require('../../database/database');

const BidStatus = sequelize.define('BidStatus', {
    title: {
        type: DataTypes.STRING
    },
}, {
    timestamps: false,
    tableName: 'BidStatus',
});


export default BidStatus;
