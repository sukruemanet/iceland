import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current || !maskRef.current || !containerRef.current) return;

    // Initial setup
    gsap.set(maskRef.current, {
      width: 300,
      height: 300,
      borderRadius: 0,
      scale: 1,
    });

    // Start video playback
    videoRef.current.play();

    // Create animation timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      delay: 0.5
    });

    tl.to(maskRef.current, {
      scale: 8,
      duration: 2,
    })
    .to(containerRef.current, {
      backgroundColor: 'transparent',
      duration: 1
    }, "-=1");

  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black" ref={containerRef}>
      {/* Mask Container */}
      <div 
        ref={maskRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{
          width: '300px',
          height: '300px'
        }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute min-w-full min-h-full object-cover"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          muted
          playsInline
        >
          <source src="https://cdn.pixabay.com/video/2023/11/03/187688-881022161_large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <h1 className="text-white text-5xl font-bold">Welcome</h1>
      </div>
    </div>
  );
}

export default App;