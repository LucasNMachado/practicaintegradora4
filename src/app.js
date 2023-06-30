const express = require('express');
const productsRoutes = require('./routes/productsRoutes');
const cartsRoutes = require('./routes/cartsRoutes');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const port = 8080;

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.json());

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Cliente conectado');
});


const MONGO = 'mongodb+srv://machadolucasn:machadolucasn@cluster0.imos5vy.mongodb.net/';
mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connetion error:', error);
  process.exit(1); 
});

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
