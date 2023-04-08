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
    await queryInterface.bulkInsert('owner', [
      {
        fio: "Александрова Оксана Константиновна",
        immovableId: 1,
        registrationCertificate: "№ 34-12-238/2011-456.3",
        fsId: 1,
        regDate: "2015-03-04",
      },
      {
        fio: "Шмонина Алина Сергеевна",
        immovableId: 1,
        registrationCertificate: "№ 32-11-238/2001-256.1",
        fsId: 3,
        regDate: "2007-12-03",
      },
      {
        fio: "Абрамов Дмитрий Олегович",
        immovableId: 2,
        registrationCertificate: "№ 34-12-238/2011-456.3",
        fsId: 3,
        regDate: "2009-07-05",
      },
      {
        fio: "Абрайтис Людмила Николаевна",
        immovableId: 3,
        registrationCertificate: "№ 34-02-228/2023-951.3",
        fsId: 3,
        regDate: "2018-04-26",
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
    await queryInterface.bulkDelete('owner', null, {});
  }
};
