import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import "dotenv/config";
import express from 'express';
import mongoose from 'mongoose';
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { DB_URL } from "./constants";
import { PostResolver } from "./resolver/Post";
import { UserResolver } from "./resolver/User";

async function main() {


    if (DB_URL)
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('----------Connected to Db---------'))

    // PostModal.insertMany(data, (error, docs) => { console.log(error, docs) })

    // // PostModal.deleteMany({}, (err) => console.log(err))

    const app = express()

    app.use(cookieParser())

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))


    const schema = await buildSchema({
        resolvers: [UserResolver, PostResolver],
        validate: false
    });


    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res })
    })


    server.applyMiddleware({ app, cors: false })


    app.listen(5000, () => console.log("-----server is running on port 5000------"))
}

main().catch(err => console.error("errors", err))