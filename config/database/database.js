const {Model} = require('objection');

const config = require('../../knexfile.js');
const knex = require('knex')(config[process.env.NODE_ENV]);

Model.knex(knex);

module.exports = knex;
