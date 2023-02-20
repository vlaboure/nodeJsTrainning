const express = require('express');
//application
const app = express();

const mongoose = require('mongoose');
//mongodb+srv://vlaboure:<password>@clustertest.pvsqpwb.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://vlaboure:<password>@clustertest.pvsqpwb.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnfieldTopology: true,
  }).then(()=> console.log('connexion mongoDb réussie')).
  catch(()=> console.log('Erreur connexion mongoDb'))

app.use(express.json());

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content,Accept,Content-type,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.post('/api/stuff',(req,res,next)=> {
  console.log(req.body);
  res.status(201).json({
    message:'objet créé'
  })
})

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });

module.exports = app;

