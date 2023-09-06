import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import MainComponent from './Components/MainComponent.js/MainComponent';
import { changeNumResult } from './features/videos/videosSlice';

function App() {

  const numResults = useSelector((state) => state.videos.numResults);
  const searchQuery = useSelector((state) => state.videos.searchQuery);
  const dispatch = useDispatch();

  return (
    <div className='container'>
      <Navbar />
      {searchQuery != "" && <div className='headerText'>
                <h1>Videos Results</h1>
                <div>
                  <p>Enter number of results you want to see: </p>
                  <input
                        type="number"
                        placeholder="Enter Numbers"
                        value={numResults}
                        onChange={e => dispatch(changeNumResult(e.target.value))}
                    />
                </div>
      </div>}
      <MainComponent />
    </div>
  );
}

export default App;
