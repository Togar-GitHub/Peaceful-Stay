'use strict';

const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotImageSeeds = [
  {
    // id: 1,
    spotId: 1,
    url: 'https://media.vrbo.com/lodging/77000000/76420000/76411300/76411266/a841b872.jpg?impolicy=resizecrop&rw=1200&ra=fit',
    preview: true
  },
  {
    // id: 2,
    spotId: 1,
    url: 'https://media.vrbo.com/lodging/77000000/76420000/76411300/76411266/0ebbc8bf.jpg?impolicy=resizecrop&rw=1200&ra=fit',
    preview: true
  },
  {
    // id: 3,
    spotId: 1,
    url: 'https://media.vrbo.com/lodging/77000000/76420000/76411300/76411266/c356fdb5.jpg?impolicy=resizecrop&rw=1200&ra=fit',
    preview: true
  },
  {
    // id: 4,
    spotId: 1,
    url: 'https://media.vrbo.com/lodging/77000000/76420000/76411300/76411266/5688d691.jpg?impolicy=resizecrop&rw=1200&ra=fit',
    preview: true
  },
  {
    // id: 5,
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/94d0139b-dcef-4a69-b6f1-d312eb41a0f2.jpg?im_w=1440&im_format=avif',
    preview: true
  },
  {
    // id: 6,
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/ccbf7333-166c-4069-b02c-97895cd2a2ed.jpg?im_w=1440&im_format=avif',
    preview: true
  },
  {
    // id: 7,
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-807948064760796364/original/de9546ca-1de1-4ef1-9d61-d0a51349031d.jpeg?im_w=720&im_format=avif',
    preview: true
  },
  {
    // id: 8,
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-807948064760796364/original/97cf24e5-9319-4b98-8968-ae532831af23.jpeg?im_w=1200&im_format=avif',
    preview: true
  },
  {
    // id: 9,
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-807948064760796364/original/3fb953f7-d6c1-48ca-9a7a-655bda610f4a.jpeg?im_w=720&im_format=avif',
    preview: true
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
   await SpotImage.bulkCreate(spotImageSeeds,
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
    // options.tableName = 'SpotImages';
    return queryInterface.bulkDelete('SpotImages', null, { schema: options.schema })
  }
};
