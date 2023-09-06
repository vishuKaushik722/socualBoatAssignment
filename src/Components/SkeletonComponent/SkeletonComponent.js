import React from "react";
import './SkeletonComponent.css'

const SkeletonComponent = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton-video"></div>
                <div className="skeleton-card-content">
                    <div className="skeleton-header"></div>
                    <div className="skeleton-description"></div>
                <div className="skeleton-tags"></div>
            </div>
        </div>
    )
}

export default SkeletonComponent;