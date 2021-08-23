// Initiate dependencies
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

// Use .env configs
require('dotenv').config()

// Creating app using express server
const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=>{
    console.log("Connected to MongoDB")
});

// Implement GraphQL Path
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);

// Start server..
app.listen(3477, () => {
    console.log('Server is running on 3477 port!!');
});