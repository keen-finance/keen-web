import React from 'react';

import AppHeader from '../partials/AppHeader';
import PageIllustration from '../partials/PageIllustration';
import PoolInfo from '../partials/PoolInfo';

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
        <PoolInfo/>

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default TradePool;