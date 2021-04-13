require('dotenv').config();
const cors = require('cors')
const express = require('express');
const userRouter = require('./routes/userRoutes')


const app = express();

////Cors
const whitelist = ["http://localhost:3001/", "http://localhost:3000/"]
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(
                new Error("Not allowed by CORS; origin domain needs to be added to whitelist.")
            );
        }
    },
};
app.use(cors())
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
