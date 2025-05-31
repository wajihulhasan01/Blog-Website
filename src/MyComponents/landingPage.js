import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, provider } from "../firebase"; // adjust the path if needed
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const images = [
  { src: `${process.env.PUBLIC_URL}/main.png`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/project.png`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/community.png`, duration: 6000 },
];
const images1 = [
  { src: `${process.env.PUBLIC_URL}/cli.png`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/idea.png`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/trust.webp`, duration: 6000 },
];
const images2 = [
  { src: `${process.env.PUBLIC_URL}/github.png`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/plan.webp`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/tool.png`, duration: 6000 },
];
const images3 = [
  { src: `${process.env.PUBLIC_URL}/laptop.png`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/image1.jpg`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/sharedgoal.png`, duration: 6000 },
];
const images4 = [
  { src: `${process.env.PUBLIC_URL}/brain.webp`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/R (1).png`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/com.png`, duration: 6000 },
];
const images5 = [
  { src: `${process.env.PUBLIC_URL}/ide.webp`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/development.webp`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/flexibility.png`, duration: 6000 },
];
const images6 = [
  { src: `${process.env.PUBLIC_URL}/image3.jpg`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/deployment.png`, duration: 3000 },
  { src: `${process.env.PUBLIC_URL}/accountability.webp`, duration: 6000 },
];

function useImageSlider(imagesArray) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % imagesArray.length);
    }, imagesArray[currentIndex].duration);
    return () => clearTimeout(timeout);
  }, [currentIndex, imagesArray]);
  return currentIndex;
}

const LandingPage = () => {
  const current1 = useImageSlider(images1);
  const current2 = useImageSlider(images2);
  const current3 = useImageSlider(images3);
  const current4 = useImageSlider(images4);
  const current5 = useImageSlider(images5);
  const current6 = useImageSlider(images6);
  const currentMain = useImageSlider(images);

  const slideVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  const ImageBlock = ({ src }) => (
    <AnimatePresence mode="wait">
      <motion.img
        key={src}
        src={src}
        alt="slider"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 1.0 }}
        className="absolute w-full h-full object-cover rounded-xl shadow-lg"
      />
    </AnimatePresence>
  );
  const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Signed in user:", user);
        // After successful sign-in, navigate to /blogpost
        navigate("/dashboard");
      } catch (error) {
        console.error("Sign in error:", error.code, error.message);
        alert(`Error: ${error.message}`);
      }
    };
    
  const navigate = useNavigate();
  

  return (
    <div className="text-center font-semibold bg-blue-600 text-white py-12 px-4 min-h-screen">
      <h1 className="text-4xl mb-2">Showcase Your Knowledge.</h1>
      <h2 className="text-lg mb-6">Build Your Dev Legacy Through Code.</h2>

      <div className="flex justify-center">
        <button   onClick={handleGoogleSignIn}
 className="bg-orange-400 rounded px-4 py-2 m-4 transition-transform hover:scale-110">
          Start Blogging
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start gap-y-6 md:gap-12 my-6 flex-wrap px-4">
        {/* Left images with padding on left */}
        <div className="flex flex-col gap-4 w-full md:w-[150px] md:pl-2">
          {[images1[current1], images2[current2], images3[current3]].map((img, i) => (
            <div key={i} className="w-[80px] h-[80px] relative overflow-hidden m-auto md:m-0">
              <ImageBlock src={img.src} />
            </div>
          ))}
        </div>

        {/* Center image */}
        <div className="w-full md:w-[400px] h-[200px] md:h-[300px] relative overflow-hidden">
          <ImageBlock src={images[currentMain].src} />
        </div>

        {/* Right images with padding on right */}
        <div className="flex flex-col gap-4 w-full md:w-[150px] md:pr-2">
          {[images4[current4], images5[current5], images6[current6]].map((img, i) => (
            <div key={i} className="w-[80px] h-[80px] relative overflow-hidden m-auto md:ml-15">
              <ImageBlock src={img.src} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
