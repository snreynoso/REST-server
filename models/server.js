const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            users: '/api/users',
            search: '/api/search',
            uploads: '/api/uploads'
        }

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
        // FileUpload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp'
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Go Server Go!!! (Running on port: ${this.port})`);
        });
    }
}

module.exports = Server;