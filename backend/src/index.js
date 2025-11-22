require("dotenv").config();
const express = require("express");
const cors = require("cors");


const projectRoutes = require("./routes/projectRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const requestLogger = require("./middleware/logger")

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/projects", projectRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});




