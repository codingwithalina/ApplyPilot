import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const animations = [
  {
    src: "https://lottie.host/449af880-1012-45e3-a667-1f3b38ee29d5/eqtF4XLhrP.lottie",
    duration: 3000,
  },
  {
    src: "https://lottie.host/09910e88-62a8-4ffe-9cec-702d5437c114/TubcCEdIeH.lottie",
    duration: 4000,
  },
  {
    src: "https://lottie.host/2463c2d2-c508-4bcc-9036-7602f2fa6734/hpbOYnj9fv.lottie",
    duration: 3500,
  },
  {
    src: "https://lottie.host/076a54ad-389e-4fd7-9552-89c140647594/csA1MVSY4Q.lottie",
    duration: 4200,
  },
];

const LottieSequenceLoop: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Forces re-mounting

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextIndex = (index + 1) % animations.length;
      setIndex(nextIndex);
      setAnimationKey((prev) => prev + 1); // Triggers re-render of DotLottieReact
    }, animations[index].duration);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="flex justify-center p-4">
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
