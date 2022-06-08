const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const pensionInfoSchema = new Schema({
    month: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    payMethod: {
        type: String,
        required: true,
    },
    pensionerId: {
        type: String,
        required: true,
    },
    creatorId: {
        type: ObjectId,
        ref: 'User',
    },
});

model("PensionInfo", pensionInfoSchema);