const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const deckSchema = require('./Deck');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength:8,
            trim: true
        },
        decks:[deckSchema]
    },

)

UserSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

UserSchema.methods.passwordCheck = async function(password) {
    return bcrypt.compare(password, this.password);
}

const User = model('User', UserSchema);

module.exports = User;