const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const login = require("../middleware/login");
const PensionInfo = mongoose.model('PensionInfo');


router.get('/mypensioninfo', login, (req, res) => {
    console.log(typeof req.headers.id);
    if (req.headers.id === 'undefined') {
        PensionInfo.find({ creatorId: req.user._id })
            .then(myPensionInfo => {
                res.json({ myPensionInfo });
            }).catch(err => {
                console.log(err);
            });
    } else {
        PensionInfo.find({ pensionerId: req.headers.id })
            .then(myPensionInfo => {
                res.json({ myPensionInfo });
            })
            .catch(err => {
                console.log(err);
            })
    }

});

router.post('/pensionInfo', login, (req, res) => {
    const { month, amount, payMethod, pensionerId, date } = req.body;
    if (!month || !amount || !payMethod || !pensionerId || !date) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    const pensionInfo = new PensionInfo({
        month,
        amount,
        date,
        payMethod,
        pensionerId,
        creatorId: req.user,
    })
    pensionInfo.save()
        .then(pensionInfo => {
            res.json({ pensionInfo });
        })
        .catch(err => {
            console.log(err);
        })
});


module.exports = router;