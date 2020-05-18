require('../../config/database');

const {Model} = require('objection');
const OpenWeather = require('../services/OpenWeather');

module.exports = class WeatherForecast extends Model {
    static get tableName() {
        return 'weather_forecast';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['city_name', 'forecast'],

            properties: {
                id: {type: 'integer'},
                city_name: {type: 'string', minimum: 2},
                forecast: {type: 'string', minimum: 10},
            },
        };
    }

    static getHistoryByCity(cityName) {
        return this
            .query()
            .where({city_name: cityName})
            .throwIfNotFound()
            .then(history => history
                .map(weather => ({...weather, forecast: JSON.parse(weather.forecast)})));
    }

    static save({cityName, forecast}) {
        return this
            .query()
            .insert({city_name: cityName, forecast: JSON.stringify(forecast)});
    }

    static getCurrentByCity(cityName) {
        return OpenWeather.getCurrentByCityName(cityName);
    }

    static getCurrentByCoordinates({lat, lon}) {
        return OpenWeather.getCurrentByCoordinates({lat, lon});
    }
};