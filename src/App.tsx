import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileCard from './components/profile/card';
import ProfileDetailPage from './components/profile/detail';
import { ProfileProvider } from './components/context/profileContext';

function App() {
  return (
    <Router>
      <ProfileProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProfileCard count={10} />} />
            <Route path="/profile/:gender" element={<ProfileDetailPage />} />
          </Routes>
        </div>
      </ProfileProvider>
    </Router>
  );
}

export default App;
