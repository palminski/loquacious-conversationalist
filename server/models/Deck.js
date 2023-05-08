const {Schema, model} = require('mongoose');
// const cardSchema = require('./Card');

const deckSchema = new Schema(
    {
        userId : {
            type: String,
            required: true,
            trim: true,
        },
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
        // cards: [cardSchema]
    }
)

const Deck = model('Deck', deckSchema);
module.exports = Deck