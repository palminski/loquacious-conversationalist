const {Schema} = require('mongoose');
const cardSchema = require('./Card');

const deckSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        cards: [cardSchema]
    }
)
module.exports = deckSchema