import React from 'react';

import AppHeader from '../partials/AppHeader';
import PageIllustration from '../partials/PageIllustration';
import PoolInfoAdd from '../partials/poolInfo/PoolInfoAdd';

import Footer from '../partials/Footer';
import AppPageHeader from '../partials/AppPageHeader';
import { Link } from 'react-router-dom';
function TradePoolAdd() {
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
        <AppPageHeader>
          <div className='flex'>
            <Link to="/trade-pool" className='font-bold flex items-center  border-b-2'  >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              <span>返回</span>
            </Link>
          </div>
        </AppPageHeader>
        {/*  Page sections */}
        <PoolInfoAdd/>

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default TradePoolAdd;