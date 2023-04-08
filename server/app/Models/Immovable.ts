import { DataTypes} from "sequelize";
import Owners from "./Owner";
const {sequelize} = require('../../database/database');

const Immovable = sequelize.define('Immovable', {
    slug: {
        type: DataTypes.STRING
    },
    floorTop: {
        type: DataTypes.INTEGER,
    },
    floorBot: {
        type: DataTypes.INTEGER,
    },
    materialType: {
        type: DataTypes.STRING,
    },
    cadastralNumber: {
        type: DataTypes.STRING,
    },
    indexMail: {
        type: DataTypes.STRING,
    },
    statusApi: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    region: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    addressDoc: {
        type: DataTypes.STRING,
    },
    floor: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.STRING,
    },
    space: {
        type: DataTypes.FLOAT,
    },
    lat: {
        type : DataTypes.FLOAT,
    },
    long: {
        type: DataTypes.FLOAT,
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
    deletedAt: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: true,
    tableName: 'immovables',
});

Immovable.hasMany(Owners);

export default Immovable;
