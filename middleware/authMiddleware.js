import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                message: "Authorizatoin token required"
            });
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message: "Token required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.userId;

        next()
    }catch(e){
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware