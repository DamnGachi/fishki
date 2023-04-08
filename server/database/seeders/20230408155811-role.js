'use strict';

const {randomUUID} = require("crypto");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         * slug
         * title
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         *
         * firstName: 'Иван',
         * lastName: 'Кузнецов',
         */

        await queryInterface.bulkInsert('role', [
            {
                slug: `ad-${randomUUID()}`,
                title: 'Администратор',
                createdAt: '2023-04-08 00:00:00'

            },
            {
                slug: `us-${randomUUID()}`,
                title: 'Пользователь',
                createdAt: '2023-04-08 00:00:00'

            }

        ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('role', null, {});
    }
};
