import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const animations = [
  {
    src: "https://lottie.host/449af880-1012-45e3-a667-1f3b38ee29d5/eqtF4XLhrP.lottie",
    duration: 3000,
    heading: "Create Your Profile"
  },
  {
    src: "https://lottie.host/09910e88-62a8-4ffe-9cec-702d5437c114/TubcCEdIeH.lottie",
    duration: 4000,
    heading: "Discover Jobs"
  },
  {
    src: "https://lottie.host/2463c2d2-c508-4bcc-9036-7602f2fa6734/hpbOYnj9fv.lottie",
    duration: 3500,
    heading: "Apply with AI-Generated Cover Letters"
  },
  {
    src: "https://lottie.host/076a54ad-389e-4fd7-9552-89c140647594/csA1MVSY4Q.lottie",
    duration: 4200,
    heading: "Land Your Dream Job"
  },
];

const LottieSequenceLoop: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextIndex = (index + 1) % animations.length;
      setIndex(nextIndex);
      setAnimationKey((prev) => prev + 1);
    }, animations[index].duration);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-applypilot-teal">
        {animations[index].heading}
      </h2>
      <DotLottieReact
        key={animationKey}
        src={animations[index].src}
        autoplay
        loop={false}
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};

export default LottieSequenceLoop;
