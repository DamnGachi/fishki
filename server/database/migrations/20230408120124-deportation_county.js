'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('deportation_county', {
      deportation_id: {
        type: Sequelize.BIGINT,
      },
      county_id: {
        type: Sequelize.BIGINT,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('deportation_county');
  }
};
