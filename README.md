# A simple API that provides the possibility to get a weather forecast  
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

## How to use API
To test these APIs you need to have some tools that enables HTTP requests 
like [Postman](https://www.getpostman.com/), [Insomnia](https://insomnia.rest/), or just [curl](https://curl.haxx.se/).

## Followups
* set up dev environment with Docker container
* enable pagination for history request
