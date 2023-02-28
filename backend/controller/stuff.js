const Thing = require('../models/Thing')

exports.createThing = ((req,res,next)=> {
    //suppression id créé par le front
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(()=>res.status(201).json({message:"objet créé"}))
      .catch(error => res.status(400).json({error}));  
});

exports.modifyThing = ((req, res, next)=>{
    //------{_id de bdd = id requete}-----{spread pour modifier le body ou _id de bdd = id de requete}     
    Thing.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'elément modifié'}))
        .catch(err => res.status(400).json({err}))
});

exports.getThings = ((req, res, next) => {
    Thing.find()
      .then(things=>res.status(200).json(things))
      .catch((err) => res.status(400).json({err}))
});

exports.getThing = ((req, res, next) =>{
    Thing.findOne({_id: req.params.id})
      .then(thing=>res.status(200).json(thing))
      .catch((err) => res.status(400).json({err}))
})

exports.deleteThing = ((req, res, next)=>{
    Thing.deleteOne({_id: req.params.id})
      .then(() => res.status(200).json({message: 'elément supprimé'}))
      .catch(err => res.status(400).json({err}))
})