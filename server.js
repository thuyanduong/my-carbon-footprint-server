require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRoutes')


const app = express();
// const bodyParser = require("body-parser");
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded());

app.get("/",(req,res)=>{
    res.send("Hello");
});

app.use('/auth', userRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Connected on port: ${PORT}`)
});
