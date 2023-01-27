const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const expiration = '16h';

module.exports = {
    signToken: function({username, _id}) {
        const payload = {username, _id};
        return jwt.sign({data: payload}, secret, {expiresIn: expiration});
    },
    authMiddleware: function ({ req }) {
        let token = req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const {data} = jwt.verify(token, secret, {maxAge: expiration});
            req.user = data;
            console.log(data);
        } catch (error) {
            console.log('Invalid Token');
            // console.log(error);
        }
        return req;
    }
};