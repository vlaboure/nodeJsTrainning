/**
 * multer --> permet de charger des images sur le serveur back
*/
const multer = require('multer');

//differents types de fichiers
const MIME_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({    
    destination :(req, file, callback) => {
        callback(null,'images')
    }, 
    filename: (req,file, callback) => {
        //création du nom du fichier enregistré dans images
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPE[file.mimetype];
        // appel du callback avec les const créées
        callback(null,name + Date.now()+ '.' + extension);
    }
})

module.exports = multer({storage: storage}).single('image');