const express = require("express")
const cors = require("cors")
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
app.listen(2309, () => {
    console.log("Server running on port 2309");
})

mongoose.connect('mongodb://127.0.0.1:27017/TodoApp?retryWrites=true&w=majority').then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});



const router = require("./routes/router");

app.use("/api", router);


const user = require("./models/user");
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const checkUser = await user.findOne({ username: username, password: password });

    if (checkUser) {
        //use jwt 
        const token = jwt.sign({
            user_id: checkUser._id,
        }, "thanhvu")

        res.status(201).json({ username: username, token: token });

    }
    else {
        res.status(400).json({ message: "Login failed" });
    }
})
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const checkUser = await user.findOne({ username: username });
    console.log(checkUser);
    if (checkUser) {
        //send status and message
        res.status(400).json({ message: "User already exists" });
    }
    else {


        const newUser = new user({
            username: username,
            password: password,
        });

        const token = jwt.sign({
            user_id: newUser._id,
        }, "thanhvu")

        newUser.token = token;

        newUser.save().then((response) => {
            res.status(201).json({ message: "User created" });
        }).catch((err) => {
            console.log(err);
        })
    }

}
)

