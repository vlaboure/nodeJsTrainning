const user = require('../models/user')

const bcrypt = require('bcrypt')

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
                .catch(err => res.status(500).json({err}))
        })
        .catch(err => res.status(500).json({err}))
}

exports.login = (req,res,next) => {
    
}