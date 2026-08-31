import Albums from './pages/Albums';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumDetails from './pages/AlbumDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Albums />} />
                <Route path="/albums/:id" element={<AlbumDetails />} />
            </Routes>
        </Router>
    );
}

export default App;