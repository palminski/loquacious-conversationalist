const { AuthenticationError } = require('apollo-server-express');
const {User} = require('../models');
const {signToken} = require('../utils/auth.js');

const resolvers = {
    Query: {
        users: async() => {
            return User.find()
        },
        currentUser: async(parent,args, context) => {
            console.log('Searching for current user');
            if(context.user){
                console.log(`current user ID ${context.user._id}`)
                const userData = await User.findOne({_id: context.user._id});
                console.log(`user data ${userData}`)
                return userData;
            }
            throw new AuthenticationError('Not Logged In');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        loginUser: async (parent, {username, password}) => {
            const user = await User.findOne({username});
            if (!user) {
                throw new AuthenticationError('User not found');
            }
            const correctPassword = await user.passwordCheck(password);
            if (!correctPassword) {
                throw new AuthenticationError('Password Incorrect');
            }
            const token = signToken(user);
            return{token,user}
        },
        addDeck: async (parent, {title, description}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {decks: {title: title, description:description}}},
                    {new:true, runValidators:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('you need to be logged in to add a deck');
        },
        deleteDeck: async (parent, {deckId}, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {decks: {_id: deckId}}},
                    {new:true}
                );
                return updatedUser;
            }
            throw new AuthenticationError('You must be logged in to delete one of your decks!');
        },
        addCard: async (parent, {deckId, sideATitle, sideADescription, sideBTitle, sideBDescription}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id,  "decks._id":deckId},
                    {$push: {"decks.$.cards": {sideATitle: sideATitle, sideADescription:sideADescription, sideBTitle: sideBTitle, sideBDescription:sideBDescription}}},
                    {new:true, runValidators:true}
                )
                return updatedUser;
            }
            throw new AuthenticationError('you need to be logged in to add a card');
        },
        editCard: async(parent, {deckId, cardId, sideATitle, sideADescription, sideBTitle, sideBDescription}, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id);
                const index = user.decks[user.decks.findIndex(deck => deck._id.toString() === deckId)].cards.findIndex(card => card._id.toString() === cardId);
                const replacer = {_id: cardId, sideATitle, sideADescription, sideBTitle, sideBDescription};
                user.decks[user.decks.findIndex(deck => deck._id.toString() === deckId)].cards.splice(index,1,replacer);
                await user.save();
                return user;
            }
        },
        deleteCard: async (parent, {deckId, cardId}, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id,  "decks._id":deckId},
                    {$pull: {"decks.$.cards": {_id: cardId}}},
                    {new:true}
                )
                return updatedUser;
            }
            throw new AuthenticationError('you need to be logged in to delete a card');
        }
    }
};

module.exports = resolvers