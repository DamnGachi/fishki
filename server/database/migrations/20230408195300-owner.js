'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('owner', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fio: {
        allowNull: false,
        type: Sequelize.STRING
      },
      registrationCertificate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fsId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue:1,
      },
      immovableId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        defaultValue:1,
      },
      regDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('owner');
  }
};
