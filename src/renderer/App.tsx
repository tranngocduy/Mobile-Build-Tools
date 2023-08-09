import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Verify from '../resource/screen/Verify';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Verify />} />
      </Routes>
    </Router>
  );
}
