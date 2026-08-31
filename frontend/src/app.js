import Albums from './pages/Albums';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumDetails from './pages/AlbumDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';
import Admin from './pages/Admin';

function App() {
    const { user } = useAuth();
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Albums />} />
                <Route path="/albums/:id" element={<AlbumDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                        path="/admin"
                        element={
                            user?.role === 'admin'
                                ? <Admin />
                                : <Login />
                        }
                    />
            </Routes>
        </Router>
    );
}

export default App;