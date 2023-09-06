import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar/Navbar';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from './features/videos/videosSlice';
import MainComponent from './Components/MainComponent.js/MainComponent';

function App() {
  return (
    <div className='container'>
      <Navbar />
      <MainComponent />
    </div>
  );
}

export default App;
