const express = require("express");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const userRouter = require("./router/userRoutes.js");
const MongoDBSession = require("connect-mongodb-session")(session);
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/haha", (req, res) => {
  res.json({ message: "hello world" });
});
const store = new MongoDBSession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
  connectionOptions: {
    serverSelectionTimeoutMS: 10000,
  },
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // thời gian sống của cookie là 1 ngày
    },
    store: store,
  })
);
app.use(passport.initialize()); //khởi tạo Passport , nó sẽ thiết lập một đối tượng req.user và các hàm để quản lý login/logout
app.use(passport.session()); //middleware sử dụng kịch bản Passport , sử dụng session lấy thông tin user rồi gắn vào req.user.
app.use("/api", userRouter);
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
