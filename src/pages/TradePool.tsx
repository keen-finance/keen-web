import React from 'react';

import AppHeader from '../partials/AppHeader';
import PageIllustration from '../partials/PageIllustration';
import PoolInfo from '../partials/poolInfo/PoolInfo';

import Footer from '../partials/Footer';
import AppPageHeader from '../partials/AppPageHeader';
import { Link } from 'react-router-dom';
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
        <AppPageHeader>
          <div className='flex space-x-2 md:h-16 max-w-full content-end items-end'>
            <Link to={`/add`} className=' text-xs md:text-base  inline-flex items-center justify-center border border-purple-600 hover:border-purple-700 px-2 py-1 md:px-4 md:py-1  rounded-sm text-purple-600 bg-transparent  transition duration-150 ease-in-out' data-aos="fade-up" data-aos-delay="200">
              增加流动性
            </Link>
            <Link to="/trade" className=' text-xs md:text-base  inline-flex items-center justify-center border border-transparent px-2 py-1 md:px-4 md:py-1 rounded-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-150 ease-in-out' data-aos="fade-up" data-aos-delay="400">
              交易
            </Link>
          </div>
        </AppPageHeader>

        {/*  Page sections */}
        <PoolInfo/>

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default TradePool;