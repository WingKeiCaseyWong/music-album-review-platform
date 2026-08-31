import { useState } from 'react';
import axiosInstance from '../axiosConfig';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/api/auth/register', formData);
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({
                        ...formData,
                        username: e.target.value
                    })}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({
                        ...formData,
                        email: e.target.value
                    })}
                />

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({
                        ...formData,
                        phoneNumber: e.target.value
                    })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({
                        ...formData,
                        password: e.target.value
                    })}
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;