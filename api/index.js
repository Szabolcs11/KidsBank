require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 80;
const cookieParser = require("cookie-parser");

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/auth"));
app.use("/family", require("./routes/family"));
app.use("/task", require("./routes/tasks"));
app.use("/weeklymeeting", require("./routes/weeklymeeting"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
