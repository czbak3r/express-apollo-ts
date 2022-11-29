import express, { Express, Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http, { Server } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

// GQL
import { resolvers } from './gql/resolvers.js';
import { typeDefs } from './gql/typeDefs.js';


// Load config
const envpath: string = path.resolve(process.cwd(), '.env');
dotenv.config({
    path: envpath,
    debug: true
});

// Express instance and HTTP server
const app: Express = express();
const httpServer: Server = http.createServer(app);

// Create Apollo Server
const server = new ApolloServer({ 
    resolvers, 
    typeDefs,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
await server.start();

// Use Middleware
app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server)
);

// Launch Server
await new Promise<void>((resolve) => httpServer.listen({ port: process.env.SERVER_PORT }, resolve));
console.log(`Server available at http://localhost:${process.env.SERVER_PORT}/`);