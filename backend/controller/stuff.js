const Thing = require('../models/Thing');
//file stream
const fs = require('fs');

exports.createThing = (req,res,next)=> {
    //suppression id créé par le front
    // delete req.body._id;
    // const thing = new Thing({
    //   ...req.body
    // });
    //--> version avec gestion des download de fichiers
    // comme l'image est transformée en text -> parse json
    const thingObject = JSON.parse(req.body.thing);
    // on se débarrasse de l'id et userId
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing ({
      ...thingObject,
      //ajout userId et imageUrl
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    thing.save()
      .then(()=>res.status(201).json({message:"objet créé"}))
      .catch(error => res.status(400).json({error}));  
};

exports.modifyThing = ((req, res, next)=>{
    //------{_id de bdd = id requete}-----{spread pour modifier le body ou _id de bdd = id de requete}     
    //Le fichier a-t-il été changé ?
  const thingObject = req.file ? {
    ...JSON.parse(req.body.thing),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  //évite que quelqu'un crée un nouvel objet et l'assigne à son nom
  delete thingObject._userId;
  //l'id objet existe ?
  Thing.findOne({_id: req.params.id})
      .then((thing) => {
          // si userId =! du vendeur d'objet
          if (thing.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
              Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
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
  Thing.findOne({_id: req.params.id})
    .then(thing=>{
      //ne peut être supprimé que par le vendeur de l'objet
      if(thing.userId != req.auth.userId){
        res.status(401).json({message:'vous n\'avez pas le droit!'});  
      }else{
        const fileName = thing.imageUrl.split('/images')[1];
        //supprime le lien mais pas le fichier physique
        fs.unlink(`images/'${fileName}`,()=> {
          Thing.deleteOne({_id: req.params.id})
            .then(()=>res.status(200).json({message:'élément supprimé'}))
            .catch(err =>res.status(401).json({err}))
        })
      }
    })
    .catch(err => res.status(400).json({err}))
})