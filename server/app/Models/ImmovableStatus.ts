import { DataTypes} from "sequelize";
const {sequelize} = require('../../database/database');

const ImmovableStatus = sequelize.define('ImmovableStatus', {
    title: {
        type: DataTypes.STRING
    },
}, {
    timestamps: false,
    tableName: 'ImmovableStatus',
});


export default ImmovableStatus;
