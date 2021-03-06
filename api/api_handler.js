/* eslint-disable linebreak-style */

const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');

const product = require('./product.js');

const resolvers = {
  Query: {
    productList: product.productList,
    product: product.getProduct,
  },
  Mutation: {
    productAdd: product.productAdd,
    productUpdate: product.productUpdate,
    productDelete: product.remove,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };
