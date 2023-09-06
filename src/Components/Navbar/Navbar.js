import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchText, fetchVideos } from '../../features/videos/videosSlice';

const Navbar = () => {

    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.videos.searchQuery);
    const numResults = useSelector((state) => state.videos.numResults);


    useEffect(() => {    
        if (searchQuery.trim() !== '') {
          dispatch(fetchVideos({ searchQuery, numResults }));
        }
      }, [searchQuery]);

    return (
        <nav className='navbar'>
            <div className='logo'>
                <img className='image' src='https://ik.imagekit.io/socialboat/Component_6__1__CgPWY-2O0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663242315232' alt='logo' />
                <div className='none'>SocialBoat</div>
            </div>
            <div className='right-nav'>
                <div>
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchQuery}
                        onChange={e => dispatch(changeSearchText(e.target.value))}
                    />
                </div>
                <div>
                    <img className='image none' src='https://media.istockphoto.com/id/856597542/photo/passport-picture-of-a-laughing-turkish-businesswoman.jpg?s=612x612&w=0&k=20&c=89b1c27NJYWCB4IcFQkxf31764fPDHwxF4c0Ou7ewOA=' alt='Profile Image' />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;