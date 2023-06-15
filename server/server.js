import chalk from 'chalk'
import express from 'express'
import 'log-timestamp'
import * as WebSocket from "ws"
import path from 'path';
import { fileURLToPath } from 'url';
const app = express()
const port = 5000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");

app.get('/', (req, res) => 'hi')

app.use(express.static(__dirname + '/public'))

export const server = app.listen(port, async ()=> {
    console.log( `🚀 ${chalk.blue.bold.italic(`Server is now running at http://localhost:${port}/`)}`)
});




