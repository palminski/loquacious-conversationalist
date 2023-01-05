const {Schema} = require('mongoose');

const cardSchema = new Schema(
    {
        side_a_title: {
            type: String,
            required: true,
            trim: true
        },
        side_a_description: {
            type: String,
            required: false,
            trim: true
        },
        side_b_title: {
            type: String,
            required: true,
            trim: true
        },
        side_b_description: {
            type: String,
            required: false,
            trim: true
        },
    }
)
module.exports = cardSchema