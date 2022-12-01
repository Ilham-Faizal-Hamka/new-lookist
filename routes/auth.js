const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);

        //find email that have exist in database
        const findUserEmail = await User.findOne({ email: req.body.email });
        if (findUserEmail)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });

        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(201).json(user);
        res.status(200).send({ message: "User created successfully" });
    } catch (err) {
        // res.status(500).json(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user)
            return res.status(401).send({ message: "Invalid Username or Password" });



        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated)
            return res.status(401).send({ message: "Invalid Email or Password" });


        const { password, ...others } = user._doc;
        res.status(201).json(others);
        res.status(200).send({ message: "logged in successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;