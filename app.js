const express = require("express");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
// const userRouter = require("./routes/users");
const { PORT = 3001 } = process.env;

const app = express();
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // in 15 minutes
//   max: 100, // you can make a maximum of 100 requests from one IP
// });

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  () => {
    console.log("connected to DB");
  },
  (e) => console.log("DB error", e)
);
// http:localHost:3001/users/12345
// app.use(helmet());
// app.use(limiter);
app.use(express.json());
// app.use((req, res, next) => {
//   req.user = {
//     _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
//   };
//   next();
// });
app.use(cors());
app.use(routes);

// app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
  console.log("This is working!");
});
