const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());

app.ws('/', (ws, req) => {
  ws.on('message', (message) => {
    message = JSON.parse(message);
    switch (message.method) {
      case 'connection':
        handleConnection(ws, message);
      case 'draw':
        broadcastConnection(ws, message);
        break;
    }
  });
});

app.post('/image', (req, res) => {
  try {
    const data = req.body.img.replace(`data:image/png;base64,`, '');
    fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64');
    return res.status(200).json({ message: "Loaded" });
  } catch (e) {
    console.log(e);
    return res.status(500).json('error');
  }
})

app.get('/image', (req, res) => {
  try {
    const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`));
    const data = `data:image/png;base64,` + file.toString('base64');
    res.json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json('error');
  }
})

app.listen(PORT, () => console.log(`Server is started on PORT ${PORT}`));

const handleConnection = (ws, message) => {
  ws.id = message.id;
  broadcastConnection(ws, message);
}

const broadcastConnection = (ws, message) => {
  console.log('mes', message)
  aWss.clients.forEach(client => {
    console.log(client.id, message.id)
    if (client.id === message.id) {
      console.log(`User ${message.username} is connected`);
      client.send(JSON.stringify(message));
    }
  })
}
