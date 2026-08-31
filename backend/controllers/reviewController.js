const Review = require('../models/Review');

const addReview = async (req, res) => {
    try {
        // Get review data sent by the frontend
        const { albumId, comment } = req.body;

        // Check required fields
        if (!albumId || !comment) {
            return res.status(400).json({
                message: 'Album ID and comment are required'
            });
        }

        // Create and save the review in MongoDB
        const review = await Review.create({
            userId: req.user._id,
            albumId,
            comment
        });

        // Send successful response
        return res.status(201).json({
            message: 'Review added successfully',
            review: review
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const getReviewsByAlbum = async (req, res) => {
    try {
        const albumId = req.params.albumId;

        const reviews = await Review.find({
            albumId: albumId
        });

        return res.status(200).json(reviews);

    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                message: 'Review not found'
            });
        }

        if (review.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'You can only edit your own review'
            });
        }

        const { comment } = req.body;

        if (!comment) {
            return res.status(400).json({
                message: 'Comment is required'
            });
        }

        review.comment = comment;

        const updatedReview = await review.save();

        return res.status(200).json({
            message: 'Review updated successfully',
            review: updatedReview
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    addReview,
    getReviewsByAlbum,
    updateReview
};