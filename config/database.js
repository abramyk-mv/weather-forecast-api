const {Model} = require('objection');

const config = require('../knexfile.js');
const knex = require('knex')(config[process.env.ENVIRONMENT]);

Model.knex(knex);

module.exports = knex;
