const router = require('express').Router();

const WeatherForecastController = require('../src/controllers/WeatherForecastController');

router.get('/weather', WeatherForecastController.getCurrent);
router.get('/weather/history', WeatherForecastController.getHistory);

module.exports = router;