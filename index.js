const express = require('express');
const server = express();
const path = require('path')
const listVeterinaries = require('./veterinary.json').results;
const port = process.env.PORT || 3001;
const Veterinary = require('./build/model/Veterinary');


server.set('port', port);

/// ruta 0: /       "Hola"

server.use('/', express.static(path.join(__dirname, '/build')));

/// ruta 1: /api                devuelve "Lista de APIs"

server.get('/api',(req, res) => {
    res.write("/api/veterinary                List of veterinaries\n");
    res.write("/api/veterinary/:objectId      Detail for veterinary\n");
    res.end()
} )

/// ruta 2: /api/veterinary     devuelve "Array de 100 veterinarias (JSON)"

server.get('/api/veterinary', (req,res) => {
    //res.json(listVeterinaries)
    Veterinary.find(req.query, (err, result) => {
        if (err) console.log(err)
        res.json(result)
    } )

})

/// ruta 3: /api/veterinary/:objectId devuelve "Objeto de 1 veterinaria"

server.get('/api/veterinary/:objectId', (req, res) => {
    // res.json(listVeterinaries.find(v=> v.objectId === req.params.objectId))
    Veterinary.find({objectId: req.params.objectId}, (err, result) => {
        if (err) console.log(err)
        res.json(result[0])
    } )
});


server.listen(port, function(){
    console.log('Listening on port '+ port)
})



