const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParse = require("cookie-parser");
const helmet = require("helmet");
const passport = require("passport");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const app = express();

// socket io
const socket = require("socket.io");

// api
const api = require("./api");

// connect Database mongoose
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbname = process.env.DB_NAME;
const URI_DATABASE = `mongodb+srv://${username}:${password}@cluster0.l99fl.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose
  .connect(URI_DATABASE)
  .then(() => console.log("🎯 Database is connected."))
  .catch((error) => console.log(error));

// middleware
app.use(helmet());
app.use(logger("dev"));
app.use(
  session({
    secret: process.env.SECRET_KEY_APP,
    store: MongoStore.create({ mongoUrl: process.env.URI_DATABASE }),
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 12 * 60 * 60 * 1000 }, // 2 day
  })
);
app.use(cookieParse());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // <-- location of the react app were connecting to
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
    // allowedHeaders: "*",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// passport
require("./middleware/passportGoogle");
require("./middleware/passportFacebook");

// Routes
app.use("/api", api);

// test api
app.use(express.Router().get("/", (req, res) => res.send("Hello")));

// start server
const PORT = process.env.PORT || 5000;
const servers = app.listen(PORT, () =>
  console.log(`✅ Server started on PORT ${PORT}`)
);

// socket
const io = socket(servers, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let listUserOnline = [];

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("online", (_id) => {
    listUserOnline.push({ [socket.id]: _id });
    console.log("userONL:::" + JSON.stringify(listUserOnline));

    io.emit("getUsersOnline", listUserOnline);
  });

  socket.on("disconnect", () => {
    listUserOnline = listUserOnline.filter(
      (item) => Object.keys(item)[0] !== socket.id
    );

    io.emit("getUsersOnline", listUserOnline);
    console.log("userDISC::: " + socket.id);
    console.log("userONL:::" + JSON.stringify(listUserOnline));
  });
});
