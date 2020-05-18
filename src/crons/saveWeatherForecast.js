const CronJob = require('cron').CronJob;

const WeatherForecast = require('../models/WeatherForecast');

new CronJob('*/10 * * * *', () => { // note: every 10 minutes
    const cityName = 'Kyiv';
    console.log(`Saving weather forecast for ${cityName}`);

    return WeatherForecast.getCurrentByCity(cityName)
        .then(weatherForecast => WeatherForecast.save({
            cityName: weatherForecast.name,
            forecast: weatherForecast,
        }))
        .catch((err) => {
            console.log(`An error occurred while saving a weather forecast: ${err.message}`);
        })
}, null, true, 'Europe/Kiev');
