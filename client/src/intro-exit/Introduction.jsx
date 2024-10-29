import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';

export function Introduction({ next }) {
  const [isButtonDisabled, setButtonDisabled] = useState(true); // initially disable button

  useEffect(() => {
    // enable button after 1 min
    const timer = setTimeout(() => {
      setButtonDisabled(false);
    }, 60000); 
    return () => clearTimeout(timer); // clean up timer on component unmount
  }, []);

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium">
        Instructions
      </h3>
      <div className="mt-2 mb-6">
        <p className="text-sm">
          Please watch the introductory video. Click next to proceed.
        </p>
      </div>
      <div className="video-responsive mb-6"> {/* Added a class for styling */}
        <iframe
          width="853"
          height="480"
          src="https://www.youtube.com/embed/Q3_7b-S5L_4" // Directly embed the video
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <Button handleClick={next} autoFocus disabled={isButtonDisabled}>
        Next
      </Button>
    </div>
  );
}
