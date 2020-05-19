const WeatherForecast = require('../models/WeatherForecast');

exports.getCurrent = (req, res) => {
    let current = Promise.reject({message: 'Failed to get current weather. Check if your query follows rules'});

    if (req.query.q) {
        current = WeatherForecast.getCurrentByCity(req.query.q);
    } else if (req.query.lat && req.query.lon) {
        current = WeatherForecast.getCurrentByCoordinates({lat: req.query.lat, lon: req.query.lon});
    }

    return current
        .then(data => res.json(data))
        .catch(err => res.status(getErrorCode(err)).send({message: err.message}));
};

exports.getHistory = (req, res) =>
    WeatherForecast.getHistoryByCity(req.query.q)
        .then(data => res.json(data))
        .catch(err => res.status(getErrorCode(err)).send({message: err.message}));

const getErrorCode = (error) => {
    if (error.statusCode) return error.statusCode;
    if (error.response && error.response.status) return error.response.status;
    return 500;
};
