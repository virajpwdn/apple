import { performanceImages } from "../constants/navbar-links";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Performance = () => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#performance",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      markers: true
    },
  });

  useGSAP(() => {
    timeline.to(".wrapper img", {
      x: -100,
      opacity: 0.8,
      stagger: 0.1,
      ease: "power2.inOut"
    });
  });
  return (
    <div id="performance" className="">
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map(({ id, src }) => {
          return id !== "p5" ? (
            <img
              key={id}
              src={src}
              alt={id}
              className={id}
            />
          ) : (
            <img
              key={id}
              src={src}
              alt={id}
              className={`p5`}
            />
          );
        })}
      </div>

      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that renders
          images faster, so{" "}
          <span className="text-white">
            gaming feels more immersive and realistic than ever.
          </span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically
          increase average GPU utilization — driving a huge performance boost
          for the most demanding pro apps and games.
        </p>
      </div>
    </div>
  );
};
export default Performance;
