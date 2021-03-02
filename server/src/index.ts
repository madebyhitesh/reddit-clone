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
import { VoteResolver } from './resolver/VoteResolver';
import { getUserLoader } from './utils/getUserLoader';

async function main() {


    if (DB_URL)
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('----------Connected to Db---------'))



    const app = express()

    app.use(cookieParser())

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))

    // PostModal.insertMany(data, (err, doc) => {
    //     console.log("error", err)
    //     console.log(doc)
    // })
    // PostModal.deleteMany()df

    const schema = await buildSchema({
        resolvers: [UserResolver, PostResolver, VoteResolver],
        validate: false
    });


    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res, getUserLoader })
    })


    server.applyMiddleware({ app, cors: false })


    app.listen(process.env.PORT || 5000, () => console.log("-----server is running on port 5000------"))
}

main().catch(err => console.error("errors", err))