const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./src/middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/src/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
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

/* app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
 */
// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
