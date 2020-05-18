exports.up = function (knex) {
    return knex.schema.alterTable('weather_forecast', (table) => {
        table.index('city_name');
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable('weather_forecast', (table) => {
        table.dropIndex('city_name');
    });
};
