// This component will switch models of mac 14" & 16"

import { PresentationControls } from "@react-three/drei";
import { lazy, Suspense, useRef } from "react";
// import { MacbookPro16 } from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mesh, type Group } from "three";
const MacbookPro16 = lazy(() =>
  import("../models/Macbook-16").then((module) => ({
    default: module.MacbookPro16,
  })),
);

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group: Group, opacity: number) => {
  if (!group) return;
  group.traverse((child) => {
    if (child instanceof Mesh) {
      child.material.transparent = true;
      gsap.to(child.material, {
        opacity,
        duration: ANIMATION_DURATION,
      });
    }
  });
};

const moveGroup = (group: Group, x: number) => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

interface ModelSwitcherProps {
  scale: number;
  isMobile: boolean;
}

const ModelSwitcher = ({ scale, isMobile }: ModelSwitcherProps) => {
  const SCALE_LAGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;
  const smallMacbookRef = useRef(null);
  const largeMacbookRef = useRef(null);

  const showLargeMacbook =
    scale === SCALE_LAGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  const controlsConfig = {
    snap: true, // brings back the model to center
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity] as [number, number], // for infinite x axis rotation
    config: { mass: 1, tension: 0, friction: 26 }, // real world physics
    polar: [-Math.PI, Math.PI] as [number, number], // for bottom rotation
  };

  useGSAP(() => {
    if (showLargeMacbook) {
      if (smallMacbookRef.current)
        moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      if (largeMacbookRef.current) moveGroup(largeMacbookRef.current, 0);

      if (smallMacbookRef.current) fadeMeshes(smallMacbookRef.current, 0);
      if (largeMacbookRef.current) fadeMeshes(largeMacbookRef.current, 1);
    } else {
      if (smallMacbookRef.current) moveGroup(smallMacbookRef.current, 0);
      if (largeMacbookRef.current)
        moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

      if (smallMacbookRef.current) fadeMeshes(smallMacbookRef.current, 1);
      if (largeMacbookRef.current) fadeMeshes(largeMacbookRef.current, 0);
    }
  }, [scale]);
  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <Suspense>
            <MacbookPro16 scale={isMobile ? 0.05 : 0.08} />
          </Suspense>
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
};
export default ModelSwitcher;
