const express = require('express');

const {
    getAlbums,
    addAlbum,
    updateAlbum,
    getAlbumById
} = require('../controllers/albumController');

const router = express.Router();

// GET /api/albums     → get all albums
// POST /api/albums    → add a new album
router.route('/')
    .get(getAlbums)
    .post(addAlbum);

// GET /api/albums/:id → get one album
// PUT /api/albums/:id → update one album
router.route('/:id')
    .get(getAlbumById)
    .put(updateAlbum);

module.exports = router;