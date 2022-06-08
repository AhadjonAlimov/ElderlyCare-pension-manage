const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/key");
const login = require("../middleware/login");


router.get('/protected', login, (req, res) => {
    res.send('Hello User!');
});

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists" });
            }
            bcrypt.hash(password, 10)
                .then(hashedPass => {
                    const user = new User({
                        name,
                        email,
                        password: hashedPass,
                    });
                    user.save()
                        .then(user => {
                            res.json({ msg: "You have successfully registered" });
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
        })


    // const { name, age, phoneNum, email, pension } = req.body;
    // if (!name || !age || !phoneNum) {
    //     return res.status(422).json({ error: "Please add all the fields" });
    // }
    // // res.json({ msg: "Successfully sent" });
    // User.findOne({ phoneNum: phoneNum })
    //     .then(savedUser => {
    //         if (savedUser) {
    //             return res.status(422).json({ error: "User already exists" });
    //         }
    //         const user = new User({
    //             name,
    //             age,
    //             phoneNum,
    //             email,
    //             pension,
    //         });
    //         user.save()
    //     })
    //     .then(user => {
    //         res.json({ msg: "Added successfully" });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "Please add email or password" });
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "User does not exist" });
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({ msg: "Successfully logged in" });
                        const token = jwt.sign({_id: savedUser._id}, JWT_SECRET);
                        const {_id, name, email} = savedUser;
                        res.json({ token, user: {_id, name, email} }); // token: token
                    }else{
                        return res.status(422).json({ error: "Wrong password" });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
})

module.exports = router;