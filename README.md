# A simple API that provides the possibility to get a weather forecast
## Requirements
* node.js 10.x.x
* npm 6.x.x
* mysql 14.14

## Project initialization
1. Navigate to the project's root directory.
2. Create `.env` file and copy content of `.env.example` file. Fill it in with your own credentials (like DB user and password).
3. Run `npm install`.

## Running project in development environment
1. Navigate to the project's root directory.
2. Make sure `8080` and `3307` ports are available on your machine. Change content of your `.env` file to the following mock data:
```
PORT=8080
NODE_ENV=development

DB_PORT=3307
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=root
DB_USE=weather
DB_USE_TEST=weather_test

OPEN_WEATHER_API_KEY=40541c59f692642fe2679ab49c0e5a73

```

_Note:_ MySQL container name should be the same as the database hostname specified in the `.env` file.
3 To build all service images run `docker-compose build` (depending on your system `docker-compose` commands may require root permission).
4. To start all services run `docker-compose up`.
5. Service is available on `http://localhost:8080/`.
6. To stop all running services run `docker-compose down`.

## Running project (without containers)
1. Run `npm run dev:start` from the project's root directory.

## Running tests
1. Navigate to the project's root directory.
2. Tests are written using [Mocha](https://mochajs.org) testing framework. Run
   `npm test:run` to execute all the tests.
   
## Available APIs  
**`GET - /weather?q={cityName}`**

The API gets current weather forecast by given city.
Parameters:
*cityName* name of the city
<br>
Response body example:
```
{
    "coord":{
        "lon": 30.52,
        "lat": 50.43
    },
    "weather":[
        {"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"…}
    ],
    "base": "stations",
    "main":{
        "temp": 282.77,
        "feels_like": 279.67,
        "temp_min": 282.15,
        "temp_max": 283.15,
        "pressure": 1020,
        "humidity": 76
    },
    "visibility": 10000,
    "wind":{
        "speed": 3,
        "deg": 290
    },
    "clouds":{
        "all": 64
    },
    "dt": 1589836456,
    "sys":{
        "type": 1,
        "id": 8903,
        "country": "UA",
        "sunrise": 1589853884,
        "sunset": 1589910261
    },
    "timezone": 10800,
    "id": 703448,
    "name": "Kyiv",
    "cod": 200
}
```

**`GET - /weather?lon={lon}&lat=${lat}`**  
  
The API gets current weather forecast by geographical coordinates.
Parameters:
*lon, lat* coordinates of the location
<br>
Response body example:
```
{
    "coord":{
        "lon": 30.52,
        "lat": 50.43
    },
    "weather":[
        {"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"…}
    ],
    "base": "stations",
    "main":{
        "temp": 282.77,
        "feels_like": 279.67,
        "temp_min": 282.15,
        "temp_max": 283.15,
        "pressure": 1020,
        "humidity": 76
    },
    "visibility": 10000,
    "wind":{
        "speed": 3,
        "deg": 290
    },
    "clouds":{
        "all": 64
    },
    "dt": 1589836456,
    "sys":{
        "type": 1,
        "id": 8903,
        "country": "UA",
        "sunrise": 1589853884,
        "sunset": 1589910261
    },
    "timezone": 10800,
    "id": 703448,
    "name": "Kyiv",
    "cod": 200
}
```

**`GET - /weather/history?q={cityName}`**

The API gets the list of weather forecasts by given city.
Currently, the history is available only for Kyiv. Data gets updated every 10 minutes.
<br>
Response body example:
```
[
    {
        "id": 1,
        "city_name": "Kyiv",
        "forecast":{"coord":{"lon": 30.52, "lat": 50.43 }, "weather":[{"id": 803,…},
        "created_at": "2020-05-18T21:10:00.000Z",
        "updated_at": "2020-05-18T21:10:00.000Z"
    },
    {
        "id": 2,
        "city_name": "Kyiv",
        "forecast":{"coord":{"lon": 30.52, "lat": 50.43 }, "weather":[{"id": 803,…},
        "created_at": "2020-05-18T21:20:00.000Z",
        "updated_at": "2020-05-18T21:20:00.000Z"
    },
    {
        "id": 3,
        "city_name": "Kyiv",
        "forecast":{"coord":{"lon": 30.52, "lat": 50.43 }, "weather":[{"id": 803,…},
        "created_at": "2020-05-18T21:30:00.000Z",
        "updated_at": "2020-05-18T21:30:00.000Z"
    },
    {
        "id": 4,
        "city_name": "Kyiv",
        "forecast":{"coord":{"lon": 30.52, "lat": 50.43 }, "weather":[{"id": 803,…},
        "created_at": "2020-05-18T21:40:00.000Z",
        "updated_at": "2020-05-18T21:40:00.000Z"
    }
]
```
Data is used from [OpenWeather](https://openweathermap.org/) service.

## How to use API
To test these APIs you need to have some tools that enables HTTP requests 
like [Postman](https://www.getpostman.com/), [Insomnia](https://insomnia.rest/), or just [curl](https://curl.haxx.se/).

## Followups
* set up dev environment with Docker container
* enable pagination for history request
* test cron job

