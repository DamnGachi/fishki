import { DataTypes} from "sequelize";
import Fs from './Fs';
import Immovable from "./Immovable";
const {sequelize} = require('../../database/database');

const Owner = sequelize.define('Owner', {
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
}, {
    timestamps: false,
    tableName: 'owner',
});

Owner.belongsTo(Fs, {foreignKey: 'fsId', targetKey: 'id', as: 'fs'});
// Owner.belongsTo(Immovable);


export default Owner;
