'use strict';

const { ReviewImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviewImageSeeds = [
  {
    // id: 1,
    reviewId: 1,
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-578116818093592631/original/59d35074-36e2-4f1d-9512-94878aa8420d.jpeg?im_w=720&im_format=avif'
  },
  {
    // id: 2,
    reviewId: 1,
    url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-578116818093592631/original/4d1e9f7d-25a9-466e-bcf5-0753941a272d.jpeg?im_w=720&im_format=avif'
  },
  {
    // id: 3,
    reviewId: 2,
    url: 'https://a0.muscache.com/im/pictures/d36ca33f-7e1d-410e-9954-6394c74d5580.jpg?im_w=720&im_format=avif'
  },
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
    await ReviewImage.bulkCreate(reviewImageSeeds,
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
    // options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete('ReviewImages', null, { schema: options.schema })
  }
};
