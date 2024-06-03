const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const cors = require("cors");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Setup security headers
app.use(helmet());

// Sanitize data
app.use(mongoSanitize());

/* Prevent XSS attacks(prevent users to add html css js tags in database), 
make sure this comes before any routes*/
app.use(xssClean());

// Setup CORS - accessible by other domains
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 50, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");
const user = require("./routes/user");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", user);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
