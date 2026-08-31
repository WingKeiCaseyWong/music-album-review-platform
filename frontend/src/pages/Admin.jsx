import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Admin = () => {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        releaseDate: '',
        description: '',
        coverImage: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/api/albums', formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            console.log('Album added successfully:', response.data);
            setMessage('Album added successfully!');
        } catch (error) {
            console.error('Failed to add album:', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Link to="/">View Albums</Link>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({
                        ...formData,
                        title: e.target.value
                    })}
                />

                <input
                    type="text"
                    placeholder="Artist"
                    value={formData.artist}
                    onChange={(e) => setFormData({
                        ...formData,
                        artist: e.target.value
                    })}
                />

                <input
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) => setFormData({
                        ...formData,
                        releaseDate: e.target.value
                    })}
                />

                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({
                        ...formData,
                        description: e.target.value
                    })}
                />

                <input
                    type="text"
                    placeholder="Cover Image URL"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({
                        ...formData,
                        coverImage: e.target.value
                    })}
                />

                <button type="submit">Add Album</button>
            </form>
        </div>
    );
};

export default Admin;