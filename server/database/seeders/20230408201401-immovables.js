'use strict';

const {randomUUID} = require("crypto");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('immovables', [
            {
                slug: `${randomUUID()}-пл Славянская, д. 4 (1)`,
                cadastralNumber: "77:01:0001014:1868",
                statusApi: "Ранее учтенный",
                name: "помещение",
                region: "Москва",
                address: "пл Славянская, д. 4 (1)",
                type: "Объект капитального строительства",
                space: 286.9,
                statusId: 1,
            },
            {
                slug: `${randomUUID()}-пл Славянская`,
                cadastralNumber: "77:01:0001014:1033",
                statusApi: "Ранее учтенный",
                name: "помещение",
                region: "Москва",
                address: "пл Славянская, д. 4 (1)",
                type: "Объект капитального строительства",
                space: 17156.4,
                statusId: 1,
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('immovables', null, {});
    }
};
