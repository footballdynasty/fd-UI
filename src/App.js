import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ResponsiveAppBar from './components/appbar'; // Adjust the import path if necessary
import Achievements from './components/pages/achievements';
import Polls from './components/pages/polls';
import Standings from './components/pages/standings';
import Media from './components/pages/media';
import Schedule from './components/pages/schedule';

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </Router>
  );
}

export default App;
