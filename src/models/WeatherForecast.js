require('../../config/database/database');

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

    /**
     * It retrieves a list of weather forecasts by given city
     * @param {string} cityName
     * @returns {*|PromiseLike<T>|Promise<T>}
     */
    static getHistoryByCity(cityName) {
        return this
            .query()
            .where({city_name: cityName})
            .throwIfNotFound()
            .then(history => history
                .map(weather => ({...weather, forecast: JSON.parse(weather.forecast)})));
    }

    /**
     * It stores a weather forecast for given city
     * @param {string} cityName
     * @param {object} forecast
     */
    static save({cityName, forecast}) {
        return this
            .query()
            .insert({city_name: cityName, forecast: JSON.stringify(forecast)});
    }

    /**
     * It gets current weather forecast for a given city
     * @param {string} cityName
     * @returns {*}
     */
    static getCurrentByCity(cityName) {
        return OpenWeather.getCurrentByCityName(cityName);
    }

    /**
     * It gets current weather forecast by given geographical coordinates
     * @param {string} lat
     * @param {string} lon
     * @returns {*}
     */
    static getCurrentByCoordinates({lat, lon}) {
        return OpenWeather.getCurrentByCoordinates({lat, lon});
    }
};
