const User = require('../models/User');
//npm install --s bcrypt pour crypter
const bcrypt = require('bcrypt');
//jwt token
const jwt = require('jsonwebtoken');
const key = require('../parameters/params')

exports.signup = (req,res,next) => {
    // hashage mp
    bcrypt.hash(req.body.password, 10)
        .then(hash=>{
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(()=> res.status(201).json({message: 'user créé'}))
                .catch(err => res.status(400).json({err}))
        })
        .catch(err => res.status(500).json({err}))
}

exports.login = (req,res,next) => {
    User.findOne({email: req.body.email})
        .then(user=>{
            //paire login mp incorrect
            if(!user){
                return res.status(401).json({message: 'Paire login/mpasse incorrect'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid=>{
                    if(!valid){
                        return res.status(401).json({message: 'Paire login/mpasse incorrect'})
                    }
                    //npm install --s jsonwebtoken
                    //pour créer le token
                    res.status(200).json({
                        userId: user._id,
                        //jwt.sign(datas,clé secrete, durée)
                        token: jwt.sign(
                            {userId: user._id},
                             key.secret_key,
                            {expiresIn: '10h'}
                        )
                    })
                })
        })
        .catch(err => res.status(500).json({err}))
}