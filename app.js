const cluster = require('cluster');

if (cluster.isMaster) {
    const env = require('dotenv').config();
    const numWorkers = require('os').cpus().length;

    console.log(`Master cluster setting up ${numWorkers} workers...`);

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork({env});
    }

    cluster.on('online', function (worker) {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster.fork();
    });

    require('./src/crons/saveWeatherForecast');
} else {
    const server = require('./config/server');

    const PORT = process.env.PORT || 8080;

    server.listen(PORT, () => {
        console.log(`Process ${process.pid} is listening to all incoming requests on port ${PORT}`);
    });
}
