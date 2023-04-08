'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('area', [
      {
        title: 'Арбат',
        countyId: 1,
      },
      {
        title: 'Басманный',
        countyId: 1,
      },
      {
        title: 'Замоскворечье',
        countyId: 1,
      },
      {
        title: "Аэропорт",
        countyId: 2,
      },
      {
        title: 'Беговой',
        countyId: 2,
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('area', null, {});

  }
};
