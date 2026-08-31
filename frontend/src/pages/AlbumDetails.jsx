import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const AlbumDetails = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);

useEffect(() => {
    const fetchAlbum = async () => {
        try {
            const response = await axiosInstance.get(`/api/albums/${id}`);
            setAlbum(response.data);
        } catch (error) {
            console.error('Failed to fetch album:', error);
        }
    };

    fetchAlbum();
}, [id]);

if (!album) {
    return <p>Loading album...</p>;
}
return (
    <div>
        <h1>{album.title}</h1>
        <p>Artist: {album.artist}</p>
        <p>Description: {album.description}</p>
        <p>Release Date: {album.releaseDate}</p>
    </div>
);
};

export default AlbumDetails;