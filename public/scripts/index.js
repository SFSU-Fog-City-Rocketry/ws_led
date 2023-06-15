
const connect = () => {
    let ws = new WebSocket("ws://localhost:3000/&?isLight=false");
    ws.onopen = (e) => {
        console.log(e)
        updateClientStatus('Connecting to server')
        updateClientStatus('Connected to server')
        displayCommands(true)
        var id = randomUUID()
    };
    
    ws.onclose = () => {
        updateClientStatus('disconnected')
        displayCommands(false)
    }

    

    ws.onmessage = (webSocketMessage) => {
        const messageBody = JSON.parse(webSocketMessage.data);
        console.log(messageBody)
        
    };
}

var updateClientStatus= (status) => {
    document.getElementById('status').innerHTML = status; 
}

var displayCommands = (isDisplayed) => {
    let style;
    isDisplayed ? style = 'display' : style = 'none' 
    document.getElementById('command-list').style.display = style;
}




