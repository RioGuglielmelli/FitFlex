const mongoose = require('mongoose');

const uri = "mongodb://fitflex:qnyrpsKDUTcYBUKE68sosUuU355aZYh1euwilp5K9lM9vZX4nJeMVv0Uaxh7YapzaqIYHtuR6jLvACDbGXceaA==@fitflex.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@fitflex@";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected successfully to Azure Cosmos DB');
}).catch((error) => {
    console.error('Database connection error:', error);
});

module.exports = mongoose;