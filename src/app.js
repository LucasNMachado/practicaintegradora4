const express = require("express");
const productsRouter = require("./routes/productsRoutes");
const cartsRouter = require("./routes/cartsRoutes");
const exphbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const homeRouter = require("./routes/homeRoutes");
const ProductManager = require("../src/dao/mongo/productManager");
const MessageManager = require("../src/dao/mongo/messageManager");

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

io.on("connection", async (socket) => {
  console.log("New connection: ", socket.id);


  socket.emit("products", await ProductManager.getProducts());


  socket.on("new-product", async (data) => {
    console.log(data);
    await ProductManager.addProduct(data);
    io.emit("products", await ProductManager.getProducts());
  });


  socket.on("chatMessage", async (data) => {
    const { user, message } = data;
    await MessageManager.createMessage(user, message);
    io.emit("chatMessage", { user, message }); 
    });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const MONGO = "mongodb://localhost/chatdb";
mongoose
  .connect(MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
