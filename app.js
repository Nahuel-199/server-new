const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const connectDatabase = require("./src/config/database");
const cors = require("cors");
const path = require("path");

const errorMiddleware = require("./src/middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "src/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

// Route Imports
const product = require("./src/routes/productRoute");
const user = require("./src/routes/userRoute");
const order = require("./src/routes/orderRoute");
const payment = require("./src/routes/paymentRoute");

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);
app.use("/api", payment);

app.use(errorMiddleware);

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name:"nahue",
  api_key: "563213948782747",
  api_secret:"Q_YOUSsfn9SOldRytAdgIS-S-zw",
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
/* app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
 */
// Middleware for Errors

module.exports = app;
