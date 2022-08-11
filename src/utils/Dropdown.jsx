import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Transition from '../utils/Transition';

function Dropdown({
  children,
  title,
  icon,
  titleClass
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setDropdownOpen(true)}
      onMouseLeave={() => setDropdownOpen(false)}
      onFocus={() => setDropdownOpen(true)}
      onBlur={() => setDropdownOpen(false)}
    >
      <a
        className="px-4 py-2 flex items-center transition duration-150 ease-in-out space-x-2"
        href="#0"
        aria-expanded={dropdownOpen}
        onClick={(e) => e.preventDefault()}
      >
        <span className={titleClass}>{title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${icon == 'language'?'flex':'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        
        <svg className={`w-4 h-4 fill-current text-white cursor-pointer ml-1 shrink-0 ${icon == 'select'?'flex':'hidden'}`}  xmlns="http://www.w3.org/2000/svg">
          <path d="M10.28 4.305L5.989 8.598 1.695 4.305A1 1 0 00.28 5.72l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z" />
        </svg>
      </a>
      <Transition
        show={dropdownOpen}
        tag="ul"
        className="origin-top-right absolute top-full right-0 w-40 bg-gray-600 py-2 ml-4 rounded-sm z-10"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        {children}
      </Transition>
    </div>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ]),
  title: PropTypes.string.isRequired,
};
