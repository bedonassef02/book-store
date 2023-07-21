import jwt from "jsonwebtoken";

const authMiddleware = (request, response, next) => {
    const authHeader = request.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(401).json({error: 'Unauthorized: Missing or invalid access token'});
    }

    const accessToken = authHeader.replace('Bearer ', '');

    try {
        request.user = jwt.verify(accessToken, process.env.TOKEN_SECRET_KEY);
        next();
    } catch (error) {
        return response.status(401).json({error: 'Unauthorized: Invalid access token'});
    }
};

export {authMiddleware};
