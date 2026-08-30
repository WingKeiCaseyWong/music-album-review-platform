const Album = require('../models/Album');

const addAlbum = async (req, res) => {
    try {
        // 1. Read album data from req.body
        const { title, description, artist, releaseDate, coverImage } = req.body;

        // 2. Check required fields
        if (!title || !artist || !releaseDate ||!description) {
            return res.status(400).json({
                message: 'Title, artist, release date and description are required'
            });
        }

        // 3. Create album in MongoDB
        const album = await Album.create({
            title,
            description,
            artist,
            releaseDate,
            coverImage
        });

        // 4. Return success response
        return res.status(201).json({
            message: 'Album added successfully',
            album: album
        });
    } catch (error) {
        // Return server error
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
const getAlbums = async (req, res) => {
    try {
        // Get all albums from MongoDB
        const albums = await Album.find();

        // Return albums to frontend
        return res.status(200).json(albums);

    } catch (error) {
        // Server error
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
const getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);

        if (!album) {
            return res.status(404).json({
                message: 'Album not found'
            });
        }

        return res.status(200).json(album);

    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const updateAlbum = async (req, res) => {
    try {
        // 1. Find album by ID
        const album = await Album.findById(req.params.id);

        // 2. If not found → 404
        if (!album) {
            return res.status(404).json({
                message: 'Album not found'
            });
        }

        // 3. Read new values from req.body
        const { title, description, artist, releaseDate, coverImage } = req.body;

        // 4. Update album fields
        album.title = title || album.title;
        album.description = description || album.description;
        album.artist = artist || album.artist;
        album.releaseDate = releaseDate || album.releaseDate;
        album.coverImage = coverImage || album.coverImage;

        // 5. Save updated album
        const updatedAlbum = await album.save();

        // 6. Return 200
        return res.status(200).json({
            message: 'Album updated successfully',
            album: updatedAlbum
        });
    } catch (error) {
        // 500 server error
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
module.exports = {
    addAlbum,
    getAlbums,
    getAlbumById,
    updateAlbum
};