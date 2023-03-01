const express = require("express");
//application
const bodyParser = require("body-parser");
const app = express();

//rourtage 
const stuffRoutes = require("./routes/stuff")
const userRoutes = require("./routes/user")
//path pour l'image
const path = require("path")

//configuration de la Bdd mogoDb    mongodb+srv://vlaboure059:JwkK1d43goQwdPcl@cluster0.i8ztuqi.mongodb.net/?retryWrites=true&w=majority
const mongoose = require('mongoose');
mongoose.set('strictQuery',true);


mongoose.connect('mongodb+srv://vlaboure059:JwkK1d43goQwdPcl@cluster0.i8ztuqi.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    serverSelectionTimeoutMS: 5000,
    family: 4
  }).then(()=> console.log("connexion mongoDb réussie")).
  catch((error)=> console.log("Erreur connexion mongoDb ",error))


app.use(express.json());

app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content,Accept,Content-type,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

app.use(bodyParser.json());

app.use('/api/stuff',stuffRoutes);
app.use('/api/auth', userRoutes);
//route pour l'image  
app.use('/images', express.static(path.join(__dirname,'images')))

module.exports = app;

