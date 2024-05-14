const express = require("express")
const colors = require("colors")
const morgan = require('morgan')
const dotenv = require('dotenv');
const mySqlPool = require("./config/db");

// configure dotenv
dotenv.config();
// rest object
const app = express();

// middlewares
app.use(express.json())
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", require("./routes/userRoutes"));

app.get("/test-api", (req, res) => {
    res.status(200).send("<h1>Test Api called.</h1>");
})

// port
const PORT = process.env.PORT || 8000;

// MySql
mySqlPool.query('SELECT 1').then(() => {
    console.log(`MySql Connected`.bgYellow.white);

    // listen
    app.listen(PORT,() =>{
        console.log(`Server Running on Port ${process.env.PORT}`.bgMagenta.white);
    })
}).catch((eror) => {
    console.log(`MySql Error ${error}`.bgRed.white);
})

