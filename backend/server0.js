const http = require('http');
const app = require('./app')


//on passe le port à app
app.set(process.env.PORT || 3000);
//création du server est 
const server = http.createServer(app);

server.listen(process.env.PORT || 3000); // port 3000 par defaut pour le devS si pb process.env