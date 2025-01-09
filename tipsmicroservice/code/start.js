const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "variables.env" });
const indexRouter = require("./routes/index.js");



const express = require('express');
const app = express();


app.use(express.json()); // Middleware para procesar JSON
app.use('/', indexRouter);

const PORT = process.env.PORT || 3016;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
