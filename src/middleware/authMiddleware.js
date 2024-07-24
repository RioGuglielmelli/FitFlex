const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: 'Access denied, no token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ error: 'Access denied, invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ error: 'Invalid token' });
    }
};
