const express = require('express');
const server = express();
const path = require('path')
const listVeterinaries = require('./veterinary.json').results;
const port = process.env.PORT || 3001;


server.set('port', port);

server.use('/', express.static(path.join(__dirname, '/build')));

/// ruta 0: /       "Hola"

server.get('/', () => {
    req.send('Hola')
})

/// ruta 1: /api                devuelve "Lista de APIs"

server.get('/api',(req, res) => {
    res.write("/api/veterinary          List of veterinaries\n");
    res.write("/api/veterinary/:id      Detail for veterinary\n");
    res.end()
} )

/// ruta 2: /api/veterinary     devuelve "Array de 100 veterinarias (JSON)"

server.get('/api/veterinary', (req,res) => {
    res.json(listVeterinaries)
})

/// ruta 3: /api/veterinary/:id devuelve "Objeto de 1 veterinaria"

server.get('/api/veterinary/:id', (req, res) => {
    res.json(listVeterinaries.find(v=> v.objectId === req.params.id))
});


server.listen(port, function(){
    console.log('Listening on port '+ port)
})



