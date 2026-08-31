import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const Albums = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axiosInstance.get('/api/albums');
                setAlbums(response.data);
            } catch (error) {
                console.error('Failed to fetch albums:', error);
            }
        };

        fetchAlbums();
    }, []);

    return (
        <div>
            <h1>Albums</h1>

            {albums.map((album) => (
                <div key={album._id}>
                    <h2>
                    <Link to={`/albums/${album._id}`}>
                        {album.title}
                    </Link>
                </h2>
                    <p>{album.artist}</p>
                    <p>{album.releaseDate}</p>
                </div>
            ))}
        </div>
    );
};

export default Albums;