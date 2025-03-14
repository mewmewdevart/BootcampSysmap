import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  
    const token = req.headers.authorization;

    if (!token){
         res.status(401).json({message: "Acces denied"})
    }

    try {

        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
        console.log(decoded);

        req.userId = decoded.id;

    } catch (err){
        return res.status(401).json({ message: "The token is wrong!" });
    }
    next()
};
 
export default auth