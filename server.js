const http = require('http')
const port = process.env.PORT || 5000
const { Server } = require("socket.io");
const fs = require('fs').promises


const server = http.createServer(async function(req,res){

if(req.url == "/"){
    res.end("Websocket server");
}

if(req.url == "/ping"){
  res.end("ping");
}

if(req.url === "/getmessages"){
    let msg = await fs.readFile("./messages.txt");
    res.end(msg);
}

})

const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

io.on("connection",  (socket)=> {
    socket.on("chat", async (message) => {
        await fs.appendFile('./messages.txt',message)
        io.emit("chat", message)
      })
})




server.listen(port)