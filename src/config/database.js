const mongoose = require('mongoose');


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected successfully to Azure Cosmos DB');
}).catch((error) => {
    console.error('Database connection error:', error);
});

module.exports = mongoose;


