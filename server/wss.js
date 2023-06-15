import { randomUUID } from "crypto";
import chalk from 'chalk';
import { timeStamp } from "console";
import * as url from 'url'
import * as queryString from 'querystring';
import 'log-timestamp'
import * as WebSocket from "ws"
import { server } from "./server.js";
const wss = new WebSocket.WebSocketServer({ server: server}, () => {
});

var lightWS = null;
var clientWS = null;

// const clients = new Map();
wss.on('connection', (ws, req) => {
    ws.id = randomUUID()
    if (queryString.parse(url.parse(req.url).query).isLight == 'true') {
        // if(lightWS != null)ws.close(1013, JSON.stringify({'type': 'ERROR', 'payload': 'Another client is connected', 'timestamp': Date.UTC()}))
        console.log(`${chalk.green.italic('Hardware websocket is now listening on server')}`)
        lightWS = ws;
        clientWS != null ? lightWS.send(JSON.stringify({'type': 'STATUS', 'PAYLOAD': 'CONNECTED', 'timestamp': Date.UTC()})) : null
    } else {
        // if(clientWS != null){ws.close(1013, JSON.stringify({'type': 'ERROR', 'payload': 'Another client is connected', 'timestamp': Date.UTC()})); return}
        console.log(`${chalk.green.italic('Client websocket is now listening on server')}`)
        clientWS = ws;
        lightWS != null ? clientWS.send(JSON.stringify({'type': 'STATUS', 'payload': 'CONNECTED'})) : null
    }

    
    



   var handleClientMessage = (message)=> {
        console.log(`📤 received message from client: ${JSON.stringify(message)}`);
        if(lightWS == null){
            clientWS.send(JSON.stringify({'type': 'ERROR', 'payload': 'Light is not connected to server'}))
            return;
        }
        switch (message.payload) {
            case 'HIGH':
                lightWS.send(JSON.stringify({ 'type': 'COMMAND', 'payload': 'HIGH',}), Date.now())
                break;
            case 'LOW':
                lightWS.send(JSON.stringify({ 'type': 'COMMAND', 'payload': 'LOW',}))
                break;
            default:
                lightWS.send(JSON.stringify({ 'type': 'COMMAND', 'payload': 'BING',}))
                break;
           }
    }

   var handleLightMessage = (message)=>{
    console.log(`📤 received message from light: ${JSON.stringify(message)}`);
        if(clientWS == null){
            lightWS.send(JSON.stringify({'type': 'ERROR', 'payload': 'Client is not connected to server'}))
        }

    }

    ws.on('message', (data, isBinary) => {  
        try {
            const message = isBinary ? data : JSON.parse(data.toString());

            if(message.message == 'PING'){
                ws.send(JSON.stringify({'type': 'MESSAGE', 'payload': 'PONG'}))
                return
            } 
            ws.id == clientWS.id ? handleClientMessage(message) : ws.id == lightWS.id ? handleLightMessage(message) : ws.send(JSON.stringify({'type': 'ERROR', 'payload': 'Unidentified client'}));
        } catch (error) {
            console.log(` ❌ ${chalk.red('Error proccessing received mesasge: ')} \n ${chalk.redBright(`${error}`)}`)
            ws.send(JSON.stringify({'type': 'ERROR', 'payload': 'Unable to handle message'}))
        }
       
    })

    ws.on('close', () => {
        if( clientWS != null &&  ws.id == clientWS.id){
            console.log(`${chalk.gray.italic('Client websocket disconnected from server')}`)
            clientWS = null
            lightWS != null ? lightWS.send(JSON.stringify({'type': 'STATUS', 'payload': 'CLOSED'})) : 0
            return
        }

        if( lightWS != null && ws.id == lightWS.id){
            console.log(`${chalk.gray.italic('Hardware websocket disconnected from server')}`)
            lightWS = null
            clientWS != null ? clientWS.send(JSON.stringify({'type': 'STATUS', 'payload': 'CLOSED'})) : 0
            return
        }

    })
   
})
wss.on('close', () => {})