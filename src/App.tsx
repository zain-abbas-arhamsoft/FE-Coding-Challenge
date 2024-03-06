import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileCard from './components/profile';
import ProfileDetailPage from './components/profiledetail';
import { ProfileProvider } from './components/context/profilecontext';

function App() {
  return (
    <Router>
      <ProfileProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProfileCard count={10} />} />
            <Route path="/profile/:name" element={<ProfileDetailPage />} />
          </Routes>
        </div>
      </ProfileProvider>
    </Router>
  );
}

export default App;
