const {Schema, model} = require('mongoose');
const {ObjectId} = Schema.Types;

const pensionerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNum: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        default: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
    },
    creatorId: {
        type: ObjectId,
        ref: "User",
    },
    pension: {
        type: Number,
        required: true,
    },
    email: String,
});

model("Pensioner", pensionerSchema);