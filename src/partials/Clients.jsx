import React from 'react';

function Clients() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 border-b border-gray-700">
        <div className="py-12 md:py-20 ">

          {/* Section header */}
          {/* <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Our customers span the globe</h1>
            <p className="text-xl text-gray-400">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div> */}

          {/* Items */}
          <div className="grid gap-2 grid-cols-4" data-aos-id-clients>

            {/* Item */}
            <div className="flex items-center justify-center h-24 border border-gray-700 p-2 text-gray-500 hover:text-white hover:border-white bg-gray-700 md:bg-transparent rounded-lg" data-aos="fade-up" data-aos-anchor="[data-aos-id-clients]">
              <svg className="max-w-full fill-current" width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.1667 32.1875H21.7014L18.75 29.4792V28.0903L21.8056 25.1736V20.5556L25.7986 17.9514L30.3472 21.3889L24.1667 32.1875ZM13.9583 24.8958L14.4097 20.5556L12.9167 16.6667H21.7361L20.2778 20.5556L20.6944 24.8958H17.2917H13.9583ZM15.9722 29.4792L13.0208 32.2222H10.5208L4.30556 21.3889L8.88889 17.9861L12.9167 20.5556V25.1736L15.9722 28.0903V29.4792ZM10.4861 8.64584H24.1319L25.7639 15.5903H8.88889L10.4861 8.64584ZM17.3264 0L0 10V30L17.3264 40L34.6528 30V10L17.3264 0Z" />
              </svg>
              <span className='text-xl font-bold hidden md:flex'>
              crypto.com
              </span>
            </div>

            {/* Item */}
            <div className="flex items-center justify-center h-24 border border-gray-700 p-2  text-gray-500 hover:text-white hover:border-white bg-gray-700 md:bg-transparent rounded-lg" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-clients]">
              <svg className="max-w-full fill-current" width="30" height="45" viewBox="0 0 30 45" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3665 0L2.4136 5.31335L11.3665 10.6287L20.4879 5.31335L11.3665 0ZM12.8389 28.3713V39L25 31.9724V21.3417L12.8389 28.3713ZM21.9602 8.65551V19.2862L12.8369 24.6016V13.9709L21.9602 8.65551ZM0 19.2862L9.12334 24.6016V13.9709L0 8.65551V19.2862ZM0 33.6867L9.12334 39V28.3713L0 23.058V33.6846V33.6867Z"/>
              </svg>
              <span className='text-xl font-bold  hidden md:flex'>
              Bancor
              </span>
            </div>

            {/* Item */}
            <div className="flex items-center justify-center h-24 border border-gray-700 p-2  text-gray-500 hover:text-white hover:border-white bg-gray-700 md:bg-transparent rounded-lg" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-clients]">
              <svg className="max-w-full fill-current" width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8468 17.9492L21.0042 9.79511L29.1649 17.9559L33.9088 13.2087L21.0042 0.300781L8.09961 13.2054L12.8468 17.9492Z" />
                <path d="M0 21.3022L4.74543 16.5568L9.49086 21.3022L4.74543 26.0477L0 21.3022Z" />
                <path d="M12.8466 24.6537L21.004 32.8111L29.1647 24.6504L33.9119 29.3909L33.9086 29.3942L21.004 42.3021L8.09941 29.4009L8.09277 29.3942L12.8466 24.6537Z" />
                <path d="M32.5088 21.3032L37.2542 16.5578L41.9996 21.3032L37.2542 26.0487L32.5088 21.3032Z" />
                <path d="M25.8173 21.2997L21.0037 16.4829L17.4442 20.0425L17.0328 20.4505L16.1902 21.2931L16.1836 21.2997L16.1902 21.3097L21.0037 26.1199L25.8173 21.3031L25.8206 21.2997H25.8173Z" />
              </svg>
              <span className='text-xl font-bold  hidden md:flex'>
              Binance
              </span>
            </div>

            {/* Item */}
            <div className="flex items-center justify-center h-24 border border-gray-700 p-2  text-gray-500 hover:text-white hover:border-white bg-gray-700 md:bg-transparent rounded-lg" data-aos="fade-up" data-aos-delay="300" data-aos-anchor="[data-aos-id-clients]">
              <svg className="max-w-full fill-current" width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 0C32.5992 0 42 9.40078 42 21C42 32.5992 32.5992 42 21 42C9.40078 42 0 32.5992 0 21C0 9.40078 9.40078 0 21 0Z" />
                <path d="M21.0041 28.3828C16.9271 28.3828 13.6213 25.0811 13.6213 21C13.6213 16.9189 16.9271 13.6172 21.0041 13.6172C24.6586 13.6172 27.6938 16.2832 28.2762 19.7695H35.7123C35.0848 12.1898 28.7396 6.23438 21 6.23438C12.8461 6.23438 6.23438 12.8461 6.23438 21C6.23438 29.1539 12.8461 35.7656 21 35.7656C28.7396 35.7656 35.0848 29.8102 35.7123 22.2305H28.2721C27.6855 25.7168 24.6586 28.3828 21.0041 28.3828Z" className="fill-gray-700 md:fill-gray-900"/>
              </svg>
              <span className='text-xl font-bold  hidden md:flex'>
              Coinbase
              </span>
            </div>

           


          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;