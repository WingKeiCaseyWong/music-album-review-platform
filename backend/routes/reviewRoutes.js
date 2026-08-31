const express = require('express');
const {
    addReview,
    getReviewsByAlbum,
    updateReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addReview);

router.get('/album/:albumId', getReviewsByAlbum);

router.put('/:id', protect, updateReview);

module.exports = router;