const {Schema} = require('mongoose');

const cardSchema = new Schema(
    {
        sideATitle: {
            type: String,
            required: true,
            trim: true
        },
        sideADescription: {
            type: String,
            required: false,
            trim: true
        },
        sideBTitle: {
            type: String,
            required: true,
            trim: true
        },
        sideBDescription: {
            type: String,
            required: false,
            trim: true
        },
    }
)
module.exports = cardSchema