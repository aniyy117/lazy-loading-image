import { useIntersection } from "@/helper/hooks/intersectionObserver";
import React, { useState, useRef } from "react";

const ImageRenderer = ({ url, thumb, width, height }) => {
  // State to track whether the original image is loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // State to track whether the component is in view
  const [isInView, setIsInView] = useState(false);

  // Ref to hold a reference to the DOM element
  const imgRef = useRef();

  // Custom hook to observe the element and set isInView state
  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  // Callback function to handle the original image load event
  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  // JSX structure for the ImageRenderer component
  return (
    <div
      className={`image-container ${isLoaded && "remove-bg-color"}`}
      ref={imgRef}
      style={{
        paddingBottom: `${(height / width) * 100}%`,
        width: "100%"
      }}
    >
      {/* Render images only if the component is in view */}
      {isInView && (
        <>
          {/* Thumbnail image */}
          <img
            className={`image thumb ${!!isLoaded && "isLoaded-thumb"}`}
            src={thumb}
            alt="Thumbnail"
          />
          
          {/* Original image */}
          <img
            className={`image ${!!isLoaded && "isLoaded-original"}`}
            src={url}
            onLoad={handleOnLoad}
            alt="Original"
          />
        </>
      )}
    </div>
  );
};

export default ImageRenderer;
