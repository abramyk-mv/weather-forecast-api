const request = require('supertest');
const server = require('../../config/server');

const agent = request.agent(server);

describe('Current weather forecast by city', () => {
    it('should list a SINGLE weather forecast on /weather?q=:cityName GET', () => {
        const cityName = 'Kyiv';

        return agent.get(`/weather?q=${cityName}`)
            .then((res) => {
                res.status.should.equal(200);
                res.body.should.be.a('object');

                res.body.should.have.property('weather');
                res.body.should.have.property('name');

                res.body.name.should.equal(cityName);
            });
    });

    it('should not list a SINGLE weather forecast with non-existing city parameter on /weather?q=:cityName GET', () => {
        const nonExistingCity = 'qwerty';

        return agent.get(`/weather?q=${nonExistingCity}`)
            .then((res) => {
                res.status.should.equal(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            });
    });

    it('should not list a SINGLE weather forecast with missing city value on /weather?q= GET', () => {
        return agent.get('/weather?q=')
            .then((res) => {
                res.status.should.equal(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            });
    });

    it('should not list a SINGLE weather forecast with missing query variable on /weather GET', () => {
        return agent.get('/weather')
            .then((res) => {
                res.status.should.equal(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            });
    });
});

describe('Current weather forecast by coordinates', () => {
    it('should list a SINGLE weather forecast on /weather?lon=:lon&lat=lat GET', () => {
        const coordinates = {lon: 30.52, lat: 50.43};

        return agent.get(`/weather?lon=${coordinates.lon}&lat=${coordinates.lat}`)
            .then((res) => {
                res.status.should.equal(200);

                res.body.should.be.a('object');

                res.body.should.have.property('coord');
                res.body.coord.should.be.a('object');
                res.body.coord.should.have.property('lon');
                res.body.coord.should.have.property('lat');

                res.body.should.have.property('weather');
                res.body.should.have.property('name');

                res.body.coord.lon.should.equal(coordinates.lon);
                res.body.coord.lat.should.equal(coordinates.lat);
            });
    });

    it('should not list a SINGLE weather forecast with wrong lon value on /weather?lon=:lon&lat=lat GET', () => {
        const coordinates = {lon: 30000, lat: 50.43}; // note: lon has wrong value

        return agent.get(`/weather?lon=${coordinates.lon}&lat=${coordinates.lat}`)
            .then((res) => {
                res.status.should.equal(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            });
    });

    it('should not list a SINGLE weather forecast with missing lon parameter on /weather?lat=lat GET', () => {
        const coordinates = {lat: 50.43};

        return agent.get(`/weather?lat=${coordinates.lat}`)
            .then((res) => {
                res.status.should.equal(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            });
    });

    it('should not list a SINGLE weather forecast with wrong lat value on /weather?lon=:lon&lat=lat GET', () => {
        const coordinates = {lon: 30.52, lat: 30000}; // note: lat has wrong value

        return agent.get(`/weather?lon=${coordinates.lon}&lat=${coordinates.lat}`)
            .then((res) => {
                res.status.should.equal(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            });
    });

    it('should not list a SINGLE weather forecast by coordinates with missing lat parameter on /weather?lon=lon GET', () => {
        const coordinates = {lon: 30.52};

        return agent.get(`/weather?lon=${coordinates.lon}`)
            .then((res) => {
                res.status.should.equal(500);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
            });
    });
});
