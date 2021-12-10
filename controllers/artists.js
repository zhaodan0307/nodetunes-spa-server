//
const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const config = require('../config/globals')
const mongoose = require('mongoose')


// this runs for before any method in this controller
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_SERVER)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    next()
})

//GET:/api/artists
router.get('/',(req, res) => {

    //fetch list of artists
    Artist.find((err,artists)=>{

        if(err){
            console.log(err)
            //这里和原来的不同
            res.json(err).status(400)
        }
        else{
            //不去sending back a view而是sending back a json
            res.json(artists).status(200)
        }

        })

    })

// POST  /api/artists

// POST: /api/artists => try to create new artist & return either 400 Bad Request or 201 Resource Created
router.post('/', (req, res) => {
    Artist.create(req.body, (err, artist) => {
        if (err) {
            console.log(err)
            res.json(err).status(400)
        } else {
            res.json(artist).status(201)
        }
    })
})

//Delete /api/artists/abc => try to delete selectd artist

router.post('/',(req, res) => {





    })

// make public
module.exports = router