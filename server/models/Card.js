const {Schema, model} = require('mongoose');

const cardSchema = new Schema(
    {
        deckId : {
            type: String,
            required: true,
            trim: true,
        },
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

const Card = model('Card', cardSchema);
module.exports = Card