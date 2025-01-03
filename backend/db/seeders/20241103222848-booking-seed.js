'use strict';  // Enable strict mode in JavaScript to catch common coding errors.

const { Booking } = require('../models');  // Import the Booking model from the models directory to interact with the 'Bookings' table in the database.
const bcrypt = require("bcryptjs");  // Import bcryptjs, which is a library for hashing and verifying passwords. (Not used in this file, but could be used elsewhere.)

// Initialize an empty options object that will be used later to configure the migration.
let options = {};

// Check if the application is running in production environment. If true, set the schema for the database.
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // In production, use a specific schema defined in the environment variables (process.env.SCHEMA).
}

const bookingSeeds = [  // An array containing the seed data for the 'Bookings' table.
  {
    // id: 1,  // The 'id' field is commented out because the database will auto-generate the id values.
    spotId: 1,  // The ID of the spot being booked (spot with ID 1).
    userId: 3,  // The ID of the user who is making the booking (user with ID 3).
    startDate: '2024-11-05',  // The start date of the booking.
    endDate: '2024-11-10'  // The end date of the booking.
  },
  {
    // id: 2,  // The 'id' field is commented out here as well.
    spotId: 2,  // The ID of the spot being booked (spot with ID 2).
    userId: 1,  // The ID of the user making the booking (user with ID 1).
    startDate: '2024-12-10',  // The start date of the booking.
    endDate: '2024-12-15'  // The end date of the booking.
  },
  {
    // id: 3,  // Again, the 'id' is commented out for auto-generation.
    spotId: 3,  // The ID of the spot being booked (spot with ID 3).
    userId: 3,  // The ID of the user making the booking (user with ID 3).
    startDate: '2024-11-20',  // The start date of the booking.
    endDate: '2024-11-25'  // The end date of the booking.
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // The 'up' function is executed when the migration is applied.
    await Booking.bulkCreate(bookingSeeds,  // Inserts the seed data into the 'Bookings' table using bulkCreate.
      { 
        schema: options.schema,  // If the schema is set (in production), use it while inserting the data.
        validate: true  // Ensure that the inserted data is validated according to the model's validation rules.
      });
  },

  async down (queryInterface, Sequelize) {
    // The 'down' function is executed when the migration is rolled back.
    return queryInterface.bulkDelete('Bookings', null, { schema: options.schema })  // Deletes all records from the 'Bookings' table.
  }
};

