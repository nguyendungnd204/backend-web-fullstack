require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");

app.use(express.json());
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true
}));
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRoute);
app.use('/post', postRoute);

app.get('/', (req, res) => {
    res.json({
        message: "Hello ngvdung"
    });

});

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
});