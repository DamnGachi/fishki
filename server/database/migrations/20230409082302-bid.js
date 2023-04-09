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
    await queryInterface.createTable('bid', {
      slug: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      cadastralNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'пусто'
      },
      region: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'пусто',
      },
      cadastralArea: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'пусто'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'пусто'
      },
      addressDoc: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'пусто'
      },
      indexMail: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'пусто'
      },
      space: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: '0'
      },
      floor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'пусто'
      },

      actionTypeId: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 1,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'пусто'
      },

      statusId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
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

    await queryInterface.dropTable('bid');
  }
};
