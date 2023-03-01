const express = require('express');
const router = express.Router();
const auth = require('../midleware/auth');
const stuffCtrl = require('../controller/stuff');
const multer = require('../midleware/multer-config');

//passage du auth à chaque requête

//passage de multer à post
router.post("/",auth, multer, stuffCtrl.createThing)// il faut modifier le controller pour multer
  
router.get("/",auth, stuffCtrl.getThings);

router.get("/:id",auth, stuffCtrl.getThing)

router.put("/:id",auth, multer, stuffCtrl.modifyThing);

router.delete("/:id",auth, stuffCtrl.deleteThing);

module.exports = router;