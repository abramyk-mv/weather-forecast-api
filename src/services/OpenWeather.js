const axios = require('axios');

exports.getCurrentByCityName = (cityName) => {
    return axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.OPEN_WEATHER_API_KEY}`,
    })
    .then(({data}) => data);
};

exports.getCurrentByCoordinates = ({lat, lon}) => {
    return axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`,
    })
    .then(({data}) => data);
};
