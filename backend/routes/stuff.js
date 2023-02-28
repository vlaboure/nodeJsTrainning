const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controller/stuff')

router.post("/",stuffCtrl.createThing)
  
router.get("/", stuffCtrl.getThings);

router.get("/:id", stuffCtrl.getThing)

router.put("/:id", stuffCtrl.modifyThing);

router.delete("/api/stuff/:id", stuffCtrl.deleteThing);

module.exports = router;