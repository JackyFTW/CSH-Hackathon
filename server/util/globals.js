function getUserUuid(req, res, error=true) {
    if(req.headers["authorization"] === undefined) {
        if(error) sendUnauthorized(res);
        return false;
    }

    let token = req.headers["authorization"].split(" ")[1];

    if(token === null || users.accessTokens[token] === undefined) {
        if(error) sendUnauthorized(res);
        return false;
    }

    return users.accessTokens[token];
}

function sendUnauthorized(res) {
    res.status(401).json({
        status: 401,
        error: "Unauthorized request"
    });
}

module.exports = {
    getUserUuid,
    sendUnauthorized
}