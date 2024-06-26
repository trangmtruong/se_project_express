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
app.use(routes);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
  console.log("kjdjkds");
});
