import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const AlbumDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();

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

        fetchAlbum();

    }, [id]);


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