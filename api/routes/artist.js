//import express and create router for artist
const express = require('express');
const router = express.Router();

//GET
router.get('/',(req,res,next) => {
    res.status(200).json({
        message:'Handling GET request to /artist'
    });
}) ;

//POST
router.post('/',(req,res,next) => {
    const artist = {
        name: req.body.name,
        age: req.body.age
    };
    res.status(201).json({
        message:'Create  request to /artist',
        createdArtist: artist
    });
}) ;

//GET/ID
router.get('/:artistId',(req,res,next) => {
    const  id = req.params.artistId;
    if(id=== 'mainArtist'){
        res.status(200).json({
            message:'GET artist with mainArtist ID'
        });
    } else {
        res.status(200).json ({
            message:'You passed an OK id'
        });
    }
}) ;


//DELETE/ID
router.delete('/:artistId',(req,res,next) => {

    res.status(200).json({
        message:'Deleted Arist'
    });
    
}) ;

//export router
module.exports = router;