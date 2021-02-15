import "dotenv/config"
import "reflect-metadata"
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolver/User";
import mongoose from 'mongoose';
import { COOKIE_NAME, DB_URL, SESSION_SECRET } from "./constants";
import cors from "cors"
import session from "express-session"
import { MyContext } from "./@types/interfaces";






async function main() {

    if (DB_URL)
        mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('----------Connected to Db---------'))

    const app = express()

    app.use(session({
        secret: SESSION_SECRET!,
        name: COOKIE_NAME,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
            sameSite: "lax",
            maxAge: 315569260000 // 10 years
        }
    }));

    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))


    const schema = await buildSchema({
        resolvers: [UserResolver],
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