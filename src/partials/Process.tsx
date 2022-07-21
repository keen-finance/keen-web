import React from 'react';
import { useTranslation } from 'react-i18next';

function Process() {
  const { t, i18n } = useTranslation();
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-10 pb-12 md:pt-16 md:pb-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4" data-aos="fade-up">{t('home.process.title')}</h2>
            <p className="text-xl text-gray-400" data-aos="fade-up" data-aos-delay="200">{t('home.process.sub_title')}</p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-3 lg:gap-16 items-start md:max-w-none">

            {/* 1st item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up">
              <div aria-hidden="true" className="absolute h-1 border-t border-dashed border-gray-700 hidden md:block" style={{ width: 'calc(100% - 32px)', left: 'calc(50% + 48px)', top: '32px' }} data-aos="fade-in" data-aos-delay="200"></div>
              <div className="w-16 h-16 mb-4 rounded-full bg-purple-600 hover:bg-purple-700 flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
              </div>
              
              
              <h4 className="h4 mb-2"><span className="text-gray-400">1</span>. {t('home.process.step.one.title')}</h4>
              <p className="text-lg text-gray-400 text-center">{t('home.process.step.one.sub_title')}</p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">
              <div aria-hidden="true" className="absolute h-1 border-t border-dashed border-gray-700 hidden md:block" style={{ width: 'calc(100% - 32px)', left: 'calc(50% + 48px)', top: '32px' }} data-aos="fade-in" data-aos-delay="400"></div>
              <div className="w-16 h-16 mb-4 rounded-full bg-purple-600 hover:bg-purple-700 flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="h4 mb-2"><span className="text-gray-400">2</span>. {t('home.process.step.two.title')}</h4>
              <p className="text-lg text-gray-400 text-center">{t('home.process.step.two.sub_title')}</p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="600">
              <div className="w-16 h-16 mb-4 rounded-full bg-purple-600 hover:bg-purple-700 flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h4 className="h4 mb-2"><span className="text-gray-400">3</span>. {t('home.process.step.three.title')}</h4>
              <p className="text-lg text-gray-400 text-center">{t('home.process.step.three.sub_title')}</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Process;
