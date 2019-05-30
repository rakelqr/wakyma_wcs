const express = require('express');
const index = express();
const path = require('path')
const listVeterinaries = require('./veterinary.json').results;
const port = process.env.PORT || 3001;


index.set('port', port);

index.use('/', express.static(path.join(__dirname, '/bild')));

/// ruta 0: /       "Hola"

index.get('/', () => {
    req.send('Hola')
})

/// ruta 1: /api                devuelve "Lista de APIs"

index.get('/api',(req, res) => {
    res.write("/api/veterinary          List of veterinaries\n");
    res.write("/api/veterinary/:id      Detail for veterinary\n");
    res.end()
} )

/// ruta 2: /api/veterinary     devuelve "Array de 100 veterinarias (JSON)"

index.get('/api/veterinary', (req,res) => {
    res.json(listVeterinaries)
})

/// ruta 3: /api/veterinary/:id devuelve "Objeto de 1 veterinaria"

index.get('/api/veterinary/:id', (req, res) => {
    res.json(listVeterinaries.find(v=> v.objectId === req.params.id))
});


index.listen(port, function(){
    console.log('Listening on port '+ port)
})



