const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Definir el esquema de Mongoose
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

// Definir el esquema GraphQL
const typeDefs = gql`
  type Item {
    id: ID!
    name: String!
    description: String!
  }

  type Query {
    getItem(id: ID!): Item
    getItems: [Item]
  }

  type Mutation {
    addItem(name: String!, description: String!): Item
    updateItem(id: ID!, name: String, description: String): Item
    deleteItem(id: ID!): Item
  }
`;

// Implementar resolvers
const resolvers = {
  Query: {
    getItem: async (_, { id }) => {
      return await Item.findById(id);
    },
    getItems: async () => {
      return await Item.find();
    },
  },
  Mutation: {
    addItem: async (_, { name, description }) => {
      const item = new Item({ name, description });
      await item.save();
      return item;
    },
    updateItem: async (_, { id, name, description }) => {
      return await Item.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
    },
    deleteItem: async (_, { id }) => {
      return await Item.findByIdAndRemove(id);
    },
  },
};

// Crear el servidor Apollo
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen({ port: 9001 }, () =>
    console.log(`🚀 Server ready at http://localhost:9000${server.graphqlPath}`)
  );
});
