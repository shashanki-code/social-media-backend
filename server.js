const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

/* Routes */

app.use(
  "/api/auth",
  require("./routes/auth.routes")
);

app.use(
  "/api/users",
  require("./routes/user.routes")
);

app.use(
  "/api/posts",
  require("./routes/post.routes")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On Port ${PORT}`
  );
});