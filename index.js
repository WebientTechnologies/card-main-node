const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const sls = require("serverless-http");
const {ErrorMiddleware} = require("./middlewares/Error");






const cors = require('cors');
app.use('/uploads', express.static('uploads'));
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://card-sandy-kappa.vercel.app"
          ],
          credentials: true,
    })
  );

app.use('/uploads', express.static('uploads'));
// load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());
app.use(cookieParser());

//import routes
const route = require("./routes/route");

//mount the todo API routes
app.use("/backend/api/v1", route);

module.exports.handler = sls(app);
app.use(ErrorMiddleware);
//start serve
app.listen(PORT, () =>{
    console.log(`Server started Successfully at ${PORT}`);
})


//connect to the database
const dbConnect = require("./config/database");
dbConnect();

