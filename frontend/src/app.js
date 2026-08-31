import Albums from './pages/Albums';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumDetails from './pages/AlbumDetails';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Albums />} />
                <Route path="/albums/:id" element={<AlbumDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;