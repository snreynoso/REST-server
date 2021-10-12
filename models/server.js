const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // DB Connect
        this.connectDB();

        // Middlewares
        this.middlewares();
        
        // My app routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Reading body
        this.app.use(express.json());

        // Public DIR
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Go Server Go!!! (Running on port: ${this.port})`);
        });
    }
}

module.exports = Server;