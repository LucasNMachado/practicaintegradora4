const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const cartsRoutes = require('./routes/cartsRoutes');
const exphbs = require('express-handlebars'); 
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = 8080;


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());


const server = http.createServer(app);


const io = socketIO(server);


io.on('connection', (socket) => {
  console.log('Cliente conectado');
});

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

