import { DataTypes} from "sequelize";
const {sequelize} = require('../../database/database');

const Fs = sequelize.define('fs', {
    title: {
        type: DataTypes.STRING
    },
}, {
    timestamps: false,
    tableName: 'fs',
});


export default Fs;
