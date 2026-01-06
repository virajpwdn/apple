import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import StudioLights from "./animation/StudioLights";
import { features, featureSequence } from "../constants/navbar-links";
import clsx from "clsx";
import { Suspense, useEffect, useRef } from "react";
import Macbook from "./models/Macbook";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
  const groupRef = useRef(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTexture } = useMacbookStore();

  // Pre-load all feature videos during component mount
  useEffect(() => {
    featureSequence.forEach((feature) => {
      const vid = document.createElement("video");

      Object.assign(vid, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });

      vid.load();
    });
  }, []);

  useGSAP(() => {
    // Model Timeline
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top top",
        end: "bottom top",
        // markers: true,
        scrub: 1,
        pin: true,
      },
    });

    // SYNC the feature content / cards
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top center",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // 3d model spin
    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: "power1.inOut",
      });
    }

    timeline
      .call(() => setTexture("/videos/feature-1.mp4"))
      .to(".box1", {
        opacity: 1,
        y: 0,
        delay: 1,
      })

      .call(() => setTexture("/videos/feature-2.mp4"))
      .to(".box2", { opacity: 1, y: 0 })

      .call(() => setTexture("/videos/feature-3.mp4"))
      .to(".box3", { opacity: 1, y: 0 })

      .call(() => setTexture("/videos/feature-4.mp4"))
      .to(".box4", { opacity: 1, y: 0 })

      .call(() => setTexture("/videos/feature-5.mp4"))
      .to(".box5", { opacity: 1, y: 0 });
  }, []);
  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">Loading...</h1>
          </Html>
        }
      >
        {/* Adds lazy loading */}
        <Macbook scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features">
      <h2>See it all in a new light.</h2>

      <Canvas id="f-canvas" camera={{}}>
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={clsx("box", `box${idx + 1}`, feature.styles)}
          >
            <img src={feature.icon} alt={feature.highlight} />
            <p>
              <span className="text-white">{feature.highlight}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Features;
