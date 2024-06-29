const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const usersRouter = require("./routes/users");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to DB");
  },
  (e) => console.log("DB error", e)
);
// http:localHost:3001/users/12345
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
  };
  next();
});
app.use(routes);

// app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
  console.log("This is working!");
});
