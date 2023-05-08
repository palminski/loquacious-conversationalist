const { AuthenticationError } = require('apollo-server-express');
const { User, Deck, Card } = require('../models');
const { signToken } = require('../utils/auth.js');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },
        currentUser: async (parent, args, context) => {

            if (context.user) {

                const userData = await User.findOne({ _id: context.user._id });

                return userData;
            }
            throw new AuthenticationError('Not Logged In');
        },
        deck: async (parent, { deckId }) => {
            try {
                console.log('===[TEST]===')
                return Deck.findOne({ _id: deckId });
            }
            catch {
                console.log("Deck Not Found");
            }

        }
    },
    Mutation: {
        //=====[User Mutations]==================================================
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        loginUser: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('User not found');
            }
            const correctPassword = await user.passwordCheck(password);
            if (!correctPassword) {
                throw new AuthenticationError('Password Incorrect');
            }
            const token = signToken(user);
            return { token, user }
        },
        //=====[Deck Mutations]==================================================
        addDeck: async (parent, { title, description }, context) => {
            if (context.user) {

                const deck = await Deck.create({ userId: context.user._id, title, description })
                return deck;
            }
            throw new AuthenticationError('you need to be logged in to add a deck');
        },
        deleteDeck: async (parent, { deckId }, context) => {
            if (context.user) {
                await Card.deleteMany({ deckId: deckId });
                const deletedDeck = await Deck.findOneAndDelete({ _id: deckId });
                return deletedDeck;
            }
            throw new AuthenticationError('You must be logged in to delete one of your decks!');
        },
        copyDeck: async (parent, { deckId }, context) => {
            if (context.user) {
                const deckToCopy = await Deck.findOne({ _id: deckId });
                const cardsToCopy = await Card.find({ deckId: deckId });
                console.log(deckToCopy);
                console.log(cardsToCopy);
                const deck = await Deck.create({ userId: context.user._id, title: deckToCopy.title, description: deckToCopy.description })
                for (i = 0; i < cardsToCopy.length; i++) {
                    Card.create({
                        deckId: deck._id,
                        sideATitle: cardsToCopy[i].sideATitle,
                        sideADescription: cardsToCopy[i].sideADescription,
                        sideBTitle: cardsToCopy[i].sideBTitle,
                        sideBDescription: cardsToCopy[i].sideBDescription
                    })
                }
                return deck;
            }
            throw new AuthenticationError('You must be logged in to delete one of your decks!');
        },
        //=====[Card Mutations]==================================================
        addCard: async (parent, { deckId, sideATitle, sideADescription, sideBTitle, sideBDescription }, context) => {
            if (context.user) {
                const card = await Card.create({ deckId, sideATitle, sideADescription, sideBTitle, sideBDescription })
                return card;
            }
            throw new AuthenticationError('you need to be logged in to add a card');
        },
        editCard: async (parent, { deckId, cardId, sideATitle, sideADescription, sideBTitle, sideBDescription }, context) => {
            if (context.user) {
                const updatedCard = await Card.findOneAndUpdate(
                    { _id: cardId },
                    { sideATitle, sideADescription, sideBTitle, sideBDescription },
                    { new: true }
                );
                return updatedCard;
            }
            throw new AuthenticationError('you need to be logged in to edit a card');
        },
        deleteCard: async (parent, { deckId, cardId }, context) => {
            if (context.user) {
                const deletedCard = await Card.findOneAndDelete({ _id: cardId });
                return deletedCard;
            }
            throw new AuthenticationError('you need to be logged in to delete a card');
        }
    },
    User: {
        decks: async (root) => {
            try {
                return await Deck.find({ userId: root._id })
            }
            catch (error) {
                throw new Error(error)
            }
        }
    },
    Deck: {
        cards: async (root) => {
            try {
                return await Card.find({ deckId: root._id })
            }
            catch (error) {
                throw new Error(error)
            }
        }
    }
};

module.exports = resolvers