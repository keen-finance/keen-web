import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../images/logo/logo_white.jpg';
import TradBg from '../images/trading-bg.png';
import DotWaveBg from '../images/dot-wave.svg';
import { useTranslation } from 'react-i18next';

function News() {
  const { t, i18n } = useTranslation();
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 ">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2" data-aos="fade-up"></h2>
          </div>

          {/* Articles list */}
          <div className="max-w-sm mx-auto md:max-w-none">
            <div className="grid gap-12 md:grid-cols-2 md:gap-x-6 md:gap-y-8 items-start">

              {/* 1st article */}
              <article className="relative  h-full bg-gradient-to-b from-purple-600 to-pink-500 rounded-lg" data-aos="fade-up">
                <img src={TradBg} className="absolute bottom-1/2 " />
                <div className='z-10 h-full w-5/6 mx-auto text-white flex flex-col space-y-8 py-10'>
                  <img className="w-20" src={Logo}  alt="News 01" />
                  <h1 className="h2  transition duration-150 ease-in-out font-bolds">
                    {t('News One Title')}
                  </h1>
                  <p className="text-lg">
                  {t('News One SubTitle')}
                    
                  </p>
                  <Link to="/" className='btn bg-black rounded-lg  w-36'>
                  {t('News One Btn')}
                  </Link>
                </div>

              </article>

              {/* 2nd article  */}
              <article className="relative h-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-lg" data-aos="fade-up" data-aos-delay="200">
                <img src={DotWaveBg} className="absolute bottom-1/2 " />
                
                <div className='z-10 h-full w-5/6 mx-auto text-white flex flex-col space-y-8 py-10'>
                  {/* <img className="w-20" src={Logo}  alt="News 01" /> */}
                  <svg t="1658242702568" className="w-20" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3548" ><path d="M512 0C229.376 0 0 229.376 0 512c0 70.144 14.336 137.216 39.936 198.656L248.832 501.76c33.28-33.28 87.552-33.28 120.832 0l69.632 69.632c16.896 16.896 43.52 16.896 60.416 0l208.384-208.384h-131.584c-23.552 0-42.496-18.944-42.496-42.496 0-23.552 18.944-42.496 42.496-42.496h234.496c23.552 0 42.496 18.944 42.496 42.496v234.496c0 23.552-18.944 42.496-42.496 42.496-23.552 0-42.496-18.944-42.496-42.496V422.912l-238.08 238.08c-33.28 33.28-87.552 33.28-120.832 0l-69.632-69.632c-16.896-16.896-43.52-16.896-60.416 0L81.92 789.504c91.136 141.312 249.856 234.496 430.08 234.496 282.624 0 512-229.376 512-512S794.624 0 512 0z" p-id="3549" fill="#ffffff"></path></svg>
                  <h1 className="h2  transition duration-150 ease-in-out font-bolds">
                  {t('News Two Title')}
                  </h1>
                  <p className="text-lg">
                  {t('News Two SubTitle')}
                  </p>
                  <Link to="/" className='btn  bg-black rounded-lg w-36'>
                  {t('News Two Btn')}
                  </Link>
                </div>

              </article>

              

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default News;
