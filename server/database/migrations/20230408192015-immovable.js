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
    await queryInterface.createTable('immovables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slug: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      floorTop: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      floorBot: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      materialType: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "пусто"
      },
      cadastralNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'пусто'
      },
      indexMail: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'пусто'
      },
      statusApi: {
        defaultValue:1,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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
      addressDoc: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'пусто'
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
      space: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: '0'
      },
      lat: {
        type : Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      long: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
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
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },

    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable('immovables');
  }
};
