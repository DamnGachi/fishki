'use strict';

const {randomUUID} = require("crypto");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     *
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('users', [
      {
        slug: `ik-${randomUUID()}-ivanKuznecov`,
        roleId: 1,
        firstName: 'Иван',
        lastName: 'Кузнецов',
        jobTitle: 'Сотрудник ГИН',
        email: 'ivanKuznecov@mail.ru',
        isActive: true,
        password: 'root',
        phone: 9028282066,
        createdAt: '2023-04-08 00:00:00'
      },
      {
        slug: `ad-${randomUUID()}-aleksKy`,
        roleId: 2,
        firstName: 'Александр',
        lastName: 'Кутузов',
        jobTitle: 'Сотрудник ГИД',
        email: 'aleksKy@mail.ru',
        isActive: true,
        password: 'root',
        phone: 9028122066,
        createdAt: '2023-04-08 00:00:00'

      }

    ], {
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
