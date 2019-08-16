const tryCatch = require('../utils/tryCatch')
const authorizationModel = require('../../db/models/authorization');

module.exports = {
    userOwnsCard(req, res, next) {
        console.log("Authenticating")
        // next()//@TODO remove this line
        const cardId = req.params.id;
        const userId = req.user;
        tryCatch(async () => {
            const authorized = await authorizationModel.user.ownsCard(userId, cardId);
            if (authorized) {
                console.log("Authorized")
                next()
            } else {
                res.status(401).send({ message: 'Unauthorized' });
            }
        });
    },

}