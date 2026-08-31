const express = require('express');

const {
    getAlbums,
    addAlbum,
    updateAlbum,
    getAlbumById
} = require('../controllers/albumController');

const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

// GET /api/albums     → get all albums
// POST /api/albums    → add a new album
router.route('/')
    .get(getAlbums)
    .post(protect, adminOnly, addAlbum);

// GET /api/albums/:id → get one album
// PUT /api/albums/:id → update one album
router.route('/:id')
    .get(getAlbumById)
    .put(protect, adminOnly, updateAlbum);

module.exports = router;