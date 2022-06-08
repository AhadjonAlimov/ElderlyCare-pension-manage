const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const login = require("../middleware/login");
const Pensioner = mongoose.model('Pensioner');


router.get('/mypensioners', login, (req, res) => {
    Pensioner.find({ creatorId: req.user._id })
        // .populate("creatorId", "_id")
        .then(myPensioners => {
            res.json({ myPensioners });
        })
        .catch(err => {
            console.log(err);
        })
});

router.post('/createpensioner', login, (req, res) => {
    const { name, age, phoneNum, email, pension, address, photo } = req.body;
    if (!name || !age || !phoneNum || !address || !pension) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    req.user.password = undefined;
    const pensioner = new Pensioner({
        name, // it means name: name
        age,
        phoneNum,
        email,
        photo,
        pension,
        address,
        creatorId: req.user,
        // creatorId: req.user._id, // this is only for id
    })

    pensioner.save()
        .then(pensioner => {
            res.json({ pensioner: pensioner });
        })
        .catch(err => {
            console.log(err);
        })
});

router.delete('/deletepensioner/:id', login, (req, res) => {
    Pensioner.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
    
});


// // this is only for test to get all the pensioners 
// router.get('/allpensioners', (req, res) => {
//     Pensioner.find()
//         // .populate("creatorId", "_id") // populate the creatorId field with the _id of the user
//         .then(allPensioners => {
//             res.json({allPensioners});
//         }).catch(err => {
//             console.log(err);
//         });
// })


module.exports = router;