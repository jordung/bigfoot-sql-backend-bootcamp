"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "category",
      [
        {
          name: "Summer",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Winter",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Autumn",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "sighting_category",
      [
        {
          sighting_id: 1,
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 2,
          category_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 3,
          category_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("sighting_category", null, {});
    await queryInterface.bulkDelete("category", null, {});
  },
};
