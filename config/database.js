const mongoose = require('mongoose');

require('dotenv').config(); // Load environment variables

const uri = process.env.COSMOS_DB_CONNECTION_STRING;

if (!uri) {
    console.error('Database connection string is not defined.');
    process.exit(1);
}

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected successfully to Azure Cosmos DB');
}).catch((error) => {
    console.error('Database connection error:', error);
});

module.exports = mongoose;
