import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import SignInPage from './views/auth/SignInPage';
import SignUpPage from './views/auth/SignUpPage';
import Hero from './views/hero';
import Navbar from './views/navbar';

const App = () => {
  return (
    <Router>
      <AuthProvider> {/* Provide a context for a user  */}
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/auth/signup" element={<SignUpPage />} />
              <Route path="/auth/signin" element={<SignInPage />} />
              <Route path="/destinations" element={<p>destination</p>} />
            </Routes>
          </div>
      </AuthProvider>
    </Router>
  )
}

export default App
