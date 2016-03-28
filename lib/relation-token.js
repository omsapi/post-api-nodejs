var jwt = require('jsonwebtoken');

function RelationToken(secret) {
    this.secret = secret;
}

RelationToken.prototype.create = function (relationId, ownerId, userId, relationName, callback) {
    jwt.sign(
        {
            id: relationId,
            ownerId: ownerId,
            userId: userId,
            relationName: relationName
        },
        this.secret,
        {},
        function (relationToken) {
            callback(relationToken);
        });
};

module.exports = RelationToken;