import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MainComponent.css';
import SkeletonComponent from '../SkeletonComponent/SkeletonComponent';
import { changeNumResult, fetchVideos } from '../../features/videos/videosSlice';

const VideoCard = ({ videoSrc, tags, header, description }) => {

  const searchQuery = useSelector((state) => state.videos.searchQuery);

  return (
    <div className="card">
      <div className="video-container">
        <iframe src={videoSrc} title="Video" allowFullScreen></iframe>
      </div>
      <div className="card-content">
        <h2>{header.replace(new RegExp(`^${`${searchQuery}:`}\\s*`), '')}</h2>
        <p>{description.replace(/^desc:\s*/, '')}</p>
        <div className="tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const MainComponent = () => {

    const videos = useSelector((state) => state.videos.data);
    const loading = useSelector((state) => state.videos.loading);
    const searchQuery = useSelector((state) => state.videos.searchQuery);
    const numResults = useSelector((state) => state.videos.numResults);
    const dispatch = useDispatch();


    useEffect(() => {    
      if (searchQuery.trim() !== '') {
        dispatch(fetchVideos({ searchQuery, numResults }));
      }
    }, [numResults]);

    const componentArray = new Array(numResults).fill(null);

    if (loading === 'loading') {
        return (
            <div className="app">
                <div className="card-grid">
                    {componentArray && componentArray.map((video) => (
                        <SkeletonComponent />
                    ))}
                </div>
            </div>
        )
      }
    
    if (loading === 'failed') {
        return <div>Error: An error occurred while fetching data.</div>;
    }

    if(searchQuery == "") {
        return <h1 style={{alignSelf: "center !important"}}>Search any fitness video you want</h1>
    }
    return (
        <>
            <div className='headerText'>
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
            </div>
            <div className="app">
                <div className="card-grid">
                    {videos.results && videos.results.map((video) => (
                        <VideoCard
                            key={video.heading}
                            videoSrc={video.video} 
                            tags={video.tags} 
                            header={video.heading} 
                            description={video.text}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MainComponent;