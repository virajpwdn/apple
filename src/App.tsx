import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProductViewer from "./components/ProductViewer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Showcase from "./components/Showcase";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Performance from "./components/Performance";
import Highlights from "./components/Highlights";

// Registering gsap plugin here so that it will be globally accessible
gsap.registerPlugin(ScrollTrigger);
const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </div>
  );
};
export default App;
