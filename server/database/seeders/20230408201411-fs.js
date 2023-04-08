'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     * 90-ФЗ
     * 214-ФЗ
     * №384-ФЗ
     * 218-ФЗ
     * 221-ФЗ
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('fs', [
      {
        title: '214-ФЗ'
      },
      {
        title: '384-ФЗ'
      },
      {
        title: '221-ФЗ'
      },
      {
        title: '218-ФЗ'
      },
      {
        title: '90-ФЗ'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('fs', null, {});
  }
};
