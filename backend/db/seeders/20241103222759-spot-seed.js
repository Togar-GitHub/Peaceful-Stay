'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotSeeds = [
  {
    // id: 1,
    ownerId: 1,
    address: '18 Abby Rd',
    city: 'Lake Ozark',
    state: 'MO',
    country: 'USA',
    lat: 38.21061,
    lng: -92.66908,
    name: 'Lakefront A-Frame Cabin!',
    description: 'Awesome Lakefront A-Frame Cabin! Unique & Cozy Interior, Dock, Great Location!',
    price: 280,
    avgRating: 4,
    previewImage: 'https://media.vrbo.com/lodging/77000000/76420000/76411300/76411266/25f94d8e.jpg?impolicy=resizecrop&rw=1200&ra=fit'
  },
  {
    // id: 2,
    ownerId: 2,
    address: '22648 Pacific Coast Hwy',
    city: 'Malibu',
    state: 'CA',
    country: 'USA',
    lat: 34.03946,
    lng: -118.66856,
    name: 'SA Beach Suite #3',
    description: 'SA Beach Suite #3 Coastal retreat on Carbon Beach',
    price: 510,
    avgRating: 4,
    previewImage: 'https://a0.muscache.com/im/pictures/e99f4706-2c4e-4690-a7da-d6ad5184c50f.jpg?im_w=1200&im_format=avif'
  },
  {
    // id: 3,
    ownerId: 2,
    address: '59 Surf Point',
    city: 'Whitethorn',
    state: 'CA',
    country: 'USA',
    lat: 40.02314,
    lng: -124.07185,
    name: 'Room in Boutique Hotel',
    description: 'Master Deluxe Suite in a boutique hotel in Whitethorn, California',
    price: 150,
    avgRating: null,
    previewImage: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-807948064760796364/original/251641e0-b8b7-4ded-ac53-5fa2bbb335a6.jpeg?im_w=1200&im_format=avif'
  }
];

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
    await Spot.bulkCreate(spotSeeds,
      { schema: options.schema,
        validate: true
      });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // options.tableName = 'Spots';
    return queryInterface.bulkDelete('Spots', null, { schema: options.schema })
  }
};
