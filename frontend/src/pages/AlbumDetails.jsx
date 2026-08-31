import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const AlbumDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [reviewComment, setReviewComment] = useState('');
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editReviewComment, setEditReviewComment] = useState('');

    const [album, setAlbum] = useState(null);
    const [editing, setEditing] = useState(false);

    const [editData, setEditData] = useState({
        title: '',
        artist: '',
        releaseDate: '',
        description: '',
        coverImage: ''
    });

useEffect(() => {
    const fetchAlbum = async () => {
        try {
            const response = await axiosInstance.get(`/api/albums/${id}`);

            setAlbum(response.data);

            setEditData({
                title: response.data.title,
                artist: response.data.artist,
                releaseDate:
                    response.data.releaseDate?.split('T')[0] || '',
                description: response.data.description,
                coverImage: response.data.coverImage
            });

        } catch (error) {
            console.error('Failed to fetch album:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axiosInstance.get(
                `/api/reviews/album/${id}`
            );

            setReviews(response.data);

        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    fetchAlbum();
    fetchReviews();

}, [id]);
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

    try {
        const response = await axiosInstance.post(
            '/api/reviews',
            {
                albumId: id,
                comment: reviewComment
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        );

        console.log('Review added successfully:', response.data);

        setReviews([
            ...reviews,
            response.data.review
        ]);

        setReviewComment('');

    } catch (error) {
        console.error('Failed to add review:', error);
    }
};
const handleReviewUpdate = async (reviewId) => {
    try {
        const response = await axiosInstance.put(
            `/api/reviews/${reviewId}`,
            {
                comment: editReviewComment
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
        );

        setReviews(
            reviews.map((review) =>
                review._id === reviewId
                    ? response.data.review
                    : review
            )
        );

        setEditingReviewId(null);
        setEditReviewComment('');

        console.log('Review updated successfully:', response.data);

    } catch (error) {
        console.error('Failed to update review:', error);
    }
};

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.put(
                `/api/albums/${id}`,
                editData,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            setAlbum(response.data.album);
            setEditing(false);

            console.log(
                'Album updated successfully:',
                response.data
            );

        } catch (error) {
            console.error(
                'Failed to update album:',
                error
            );
        }
    };


    if (!album) {
        return <p>Loading album...</p>;
    }


    return (
        <div>

            <h1>{album.title}</h1>

            <p>Artist: {album.artist}</p>

            <p>Description: {album.description}</p>

            <p>Release Date: {album.releaseDate}</p>

            <h2>Reviews</h2>

{reviews.length === 0 ? (
    <p>No reviews yet.</p>
) : (
    reviews.map((review) => {
        const isOwner = user?.id === review.userId;
        const isEditing = editingReviewId === review._id;

        return (
            <div key={review._id} className="review-card">
                {isEditing ? (
                    <div className="review-edit-form">
                        <textarea
                            value={editReviewComment}
                            onChange={(e) =>
                                setEditReviewComment(e.target.value)
                            }
                            placeholder="Edit your review..."
                            required
                        />

                        <div className="review-actions">
                            <button
                                type="button"
                                onClick={() => handleReviewUpdate(review._id)}
                            >
                                Update Review
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setEditingReviewId(null);
                                    setEditReviewComment('');
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="review-comment">{review.comment}</p>

                        {isOwner && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingReviewId(review._id);
                                    setEditReviewComment(review.comment);
                                }}
                            >
                                Edit
                            </button>
                        )}
                    </>
                    
                )}
            </div>
        );
    })
)}

            {user?.role === 'listener' && (
           <form onSubmit={handleReviewSubmit}>
                <textarea
                    placeholder="Write your own review..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                />

                <button type="submit">
                    Submit Review
                </button>
            </form>
        )}
            {user?.role === 'admin' && (
                <button onClick={() => setEditing(true)}>
                    Edit Album
                </button>
            )}


            {editing && (
                <form onSubmit={handleUpdate}>

                    <input
                        type="text"
                        placeholder="Title"
                        value={editData.title}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                title: e.target.value
                            })
                        }
                    />


                    <input
                        type="text"
                        placeholder="Artist"
                        value={editData.artist}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                artist: e.target.value
                            })
                        }
                    />


                    <input
                        type="date"
                        value={editData.releaseDate}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                releaseDate: e.target.value
                            })
                        }
                    />


                    <textarea
                        placeholder="Description"
                        value={editData.description}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                description: e.target.value
                            })
                        }
                    />


                    <input
                        type="text"
                        placeholder="Cover Image URL"
                        value={editData.coverImage}
                        onChange={(e) =>
                            setEditData({
                                ...editData,
                                coverImage: e.target.value
                            })
                        }
                    />
                    

                    <button type="submit">
                        Update Album
                    </button>

                </form>
            )}

        </div>
    );
};

export default AlbumDetails;