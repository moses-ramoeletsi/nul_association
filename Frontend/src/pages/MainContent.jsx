import React from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Mission from "../components/Mission";
import Activities from "../components/Activities";
import Footer from "../components/Footer";

const MainContent = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Mission />
        <Activities />
      </main>
      <Footer />
    </div>
  );
};

export default MainContent;
