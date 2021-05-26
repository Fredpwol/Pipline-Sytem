const User = require("./User")
const express = require("express")

const userRoute = express.Router();


userRoute.get("/", async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
})

userRoute.get("/:_id", async (req, res) => {
    const user = await User.findById(req.params._id);
    res.status(200).json(user)
})

module.exports = userRoute;