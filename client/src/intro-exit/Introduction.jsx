import React from 'react';
import { Button } from '../components/Button';

export function Introduction({ next }) {
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
          src="https://www.youtube.com/embed/2u72Nwd0zkU" // Directly embed the video
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <Button handleClick={next} autoFocus>
        Next
      </Button>
    </div>
  );
}
