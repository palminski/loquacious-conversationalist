const path = require ('path');
const express = require('express');

const {ApolloServer} = require('apollo-server-express');

const {typeDefs, resolvers} = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const db = require('./config/connection');
const PORT = process.env.PORT || 3001

//------[Create Apollo Server]----------------------
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

//------[Set Up Express]----------------------------
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//------[Set up Apollo Server with GQL schema]------
const startApolloServer = async(typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({app});

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    }

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`

======================================================
            
            Server Up and Running!
    Test GraphQL at http://localhost:${PORT}${server.graphqlPath}

======================================================

            `)
        })
    })
}

//------[Start the Server]--------------------------
startApolloServer(typeDefs,resolvers);