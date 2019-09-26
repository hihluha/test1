require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const config = require("./config/keys");
const customers = require("./routes/customers");
const user = require("./routes/user");
const orders = require("./routes/order");

const User = require("./models/User");

const port = process.env.PORT || 5000;

const db = config.mongodbURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

mongoose.set("useCreateIndex", true);

app.set("Secret", config.secret);

app.use(
  session({
    name: "session",
    secret: config.secret || "this is default secret",
    store: new MongoStore({ url: db }),
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 14400000
    }
  })
);

app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use("/user", user);
app.use("/customers", customers);
app.use("/orders", orders);

app.get("*", (req, res) => {
  res.redirect("http://localhost:8080/");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
