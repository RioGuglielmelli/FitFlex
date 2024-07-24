const mongoose = require('mongoose');

const uri = process.env.COSMOS_DB_CONNECTION_STRING;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected successfully to Azure Cosmos DB');
}).catch((error) => {
    console.error('Database connection error:', error);
});

module.exports = mongoose;


