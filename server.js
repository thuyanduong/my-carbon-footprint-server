require('dotenv').config();
const express = require('express');
const app = express();
// const bodyParser = require("body-parser");
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded());

app.get("/",(req,res)=>{
    res.send("Hello");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Connected on port: ${PORT}`)
});
