const express = require('express');
const { addReview, getReviewsByAlbum } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addReview);

router.get('/album/:albumId', getReviewsByAlbum);

module.exports = router;