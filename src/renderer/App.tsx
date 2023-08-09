import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Verify from '../resource/screen/Verify';
import Detail from '../resource/screen/Detail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Verify />} />
        <Route path="/Detail" element={<Detail />} />
      </Routes>
    </Router>
  );
}
