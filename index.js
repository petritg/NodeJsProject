const Joi = require('joi');
const schema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(30)
    .required()
});
const express = require('express');
const app = express();

app.use(express.json());

const albums = [
    {id: 1, name: 'album1' },
    {id: 2, name: 'album2' },
    {id: 3, name: 'album3' },
    
];
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/albums', (req, res) => {
    res.send(albums);
});

app.get('/api/albums/:id', (req, res) => {
    const album = albums.find(a => a.id === parseInt(req.params.id));
    if(!album) return res.status(404).send('The album with the given ID was not found.');
    res.send(album);

});

app.post('/api/albums', (req, res) =>{
    
    const {error} = validateAlbum(req.body); // result.error
    
    if(error) return res.status(400).send(error.details[0].message);
        
    

    const album = {
      id: albums.length + 1,
      name: req.body.name  
    };
    albums.push(album);
    res.send(album);
});

app.put('/api/albums/:id', (req, res) =>{
    const album = albums.find(a => a.id === parseInt(req.params.id));
    if(!album) return res.status(404).send('The album with the given ID was not found.');

    
    const {error} = validateAlbum(req.body); // result.error
    
    if(error) return res.status(400).send(error.details[0].message);
        
    

    album.name = req.body.name;
    res.send(album);
});

app.delete('/api/albums/:id', (req, res) => {
    const album = albums.find(a => a.id === parseInt(req.params.id));
    if(!album) return res.status(404).send('The album with the given ID was not found.');

    const index = albums.indexOf(album);
    albums.splice(index, 1);

    res.send(album);
});

function validateAlbum(album) {
    return schema.validate(album);
}

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listining on port ${port}...`));