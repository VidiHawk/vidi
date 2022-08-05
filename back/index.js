const fs =  require("fs");
const http = require("http");
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
const settings = require("./setting/loadSetting");
settings.initializeEnvironmentSettings();

const port = 4000;

const isProd = process.env.NODE_ENV === "prod";
const isDev = !isProd;

const app = express();
const apolloServer = new ApolloServer({ typeDefs, resolvers });

apolloServer.applyMiddleware({ app });

const httpServer = http.createServer(app);

if(isDev) {
  app.listen(port,() => {
    console.log(`Graphql Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
  });
}else {
  httpServer.listen(port,() => {
    console.log(`Graphql Server ready at https://localhost:${port}${apolloServer.graphqlPath}`);
  });
}
