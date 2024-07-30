import express from 'express'
import dotenv from 'dotenv'
import { Connection } from './db.js'

const app = express()
dotenv.config()


app.listen(process.env.Port,() => {
    console.log("Serve is Running");
})