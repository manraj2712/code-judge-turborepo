import React from "react";

import Hero from '@/components/home/hero'
import Features from '@/components/home/features'
import FeaturesBlocks from '@/components/home/features-blocks'
import Testimonials from '@/components/home/testimonials'
import Newsletter from '@/components/home/newsletter'


const Home = () => {
  return (
    <div>
       <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
