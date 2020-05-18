
exports.up = function (knex) {
    return knex.schema.createTable('weather_forecast', (table) => {
        table.increments('id').primary();
        table.string('city_name').notNullable();
        table.mediumtext('forecast').notNullable();
        table.timestamps(null, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('weather_forecast');
};
