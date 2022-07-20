import React from 'react';

import AppHeader from '../partials/AppHeader';
import PageIllustration from '../partials/PageIllustration';
import HeroFeatures from '../partials/HeroFeatures';
import Stats from '../partials/Stats';
import FeaturesZigzag from '../partials/FeaturesZigzag';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import CaseStudies from '../partials/CaseStudies';
import Cta from '../partials/Cta';
import Footer from '../partials/Footer';

function TradePool() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <AppHeader current='trade_pool'/>

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        {/*  Page sections */}
        <HeroFeatures />
        <Stats />
        <FeaturesZigzag />
        <FeaturesBlocks />
        <CaseStudies />
        <Cta />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default TradePool;