const express = require("express");
const productsRouter = require("./routes/productsRoutes");
const cartsRouter = require("./routes/cartsRoutes");
const exphbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const homeRouter = require("./routes/homeRoutes");
const ProductManager = require("./dao/fs/productManager");

const app = express();
const port = 8080;

app.engine("handlebars", exphbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", homeRouter);

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("Cliente conectado");
});

const MONGO =
  "mongodb+srv://machadolucasn:machadolucasn@cluster0.imos5vy.mongodb.net/";
mongoose
  .connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
