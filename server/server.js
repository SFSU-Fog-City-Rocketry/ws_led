import chalk from 'chalk'
import express from 'express'
import 'log-timestamp'
import * as WebSocket from "ws"
import path from 'path';
import { fileURLToPath } from 'url';
const app = express()
const port = 5000

const __filename = fileURLToPath(import.meta.url);

app.get('/', (req, res) => 'hi')

export const server = app.listen(port, async ()=> {
    console.log( `🚀 ${chalk.blue.bold.italic(`Server is now running at http://localhost:${port}/`)}`)
});




