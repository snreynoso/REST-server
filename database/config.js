const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGODB_CNN), {
            useNewUrlParser: true,
            useNewUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
        console.log('Connection with Atlas MongoDB successful!');
    } catch (error) {
        console.log(error);
        throw new Error('Error initializing database');
    }
}

module.exports = {
    dbConnection
}