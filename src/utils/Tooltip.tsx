import React, { useState,useEffect } from 'react';
import Transition from './Transition';

function Tooltip({
  children,
  className,
  bg,
  size,
  position,
  title,
  textColor,
  outerFocus
}) {

  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(()=>{
    
    setTooltipOpen(outerFocus)
    
  },[outerFocus]);
  

  const positionOuterClasses = (position) => {
    switch (position) {
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2';
      case 'bottom':
        return 'top-full ';
      default:
        return 'bottom-full';
    }
  }

  const sizeClasses = (size) => {
    switch (size) {
      case 'lg':
        return 'min-w-72  p-3';
      case 'md':
        return 'min-w-56 p-3';
      case 'sm':
        return 'min-w-44 p-2';
      default:
        return 'p-2';
    }
  };

  const positionInnerClasses = (position) => {
    switch (position) {
      case 'right':
        return 'ml-2';
      case 'left':
        return 'mr-2';
      case 'bottom':
        return 'mt-2';
      default:
        return 'mb-2';
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      onFocus={() => setTooltipOpen(true)}
      onBlur={() => setTooltipOpen(false)}
    >
      <button
        className={`flex items-center ${textColor}`}
        aria-haspopup="true"
        aria-expanded={tooltipOpen}
        onClick={(e) => e.preventDefault()}
      >
        <svg className="w-4 h-4 fill-current " viewBox="0 0 16 16">
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
        </svg>
        <div className="text-sm font-medium ml-2 underline decoration-dotted underline-offset-2">{title}</div>
      </button>
      <div className={`z-10 absolute ${positionOuterClasses(position)}`}>
        <Transition
          show={tooltipOpen}
          tag="div"
          className={`rounded overflow-hidden ${bg === 'dark' ? 'bg-gray-900' : 'bg-white border border-slate-200 shadow-lg'} ${sizeClasses(size)} ${positionInnerClasses(position)}`}
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
    </div>
  );
}

export default Tooltip;