'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('deportation_area', {
      deportation_id: {
        type: Sequelize.BIGINT,
      },
      area_id: {
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
    await queryInterface.dropTable('deportation_area');
  }
};
