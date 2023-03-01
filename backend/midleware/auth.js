const jwt = require('jsonwebtoken');
const key = require('../parameters/params')

//midlware 
/*
 * récupère le token, le vérifie et ajoute le useId à la requête
 * les routes transmises contiendront donc ce userId
*/
module.exports = (req, res, next) => {
    try{
        //récup du token ds le header
        const token = req.headers.authorization.split(' ')[1];//token en 2eme
        const decodeToken = jwt.verify(token, key.secret_key);
        const userId = decodeToken.userId;
        req.auth = {userId: userId};            
        next();
    }
    catch(err){
        res.status(401).json({err})        
    }
}