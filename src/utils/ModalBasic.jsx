import React, { useRef, useEffect } from 'react';
import Transition from '../utils/Transition';

function ModalBasic({
  children,
  id,
  title,
  modalOpen,
  setModalOpen
}) {

  const modalContent = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-white bg-opacity-10 z-10"
        show={modalOpen}
        enter="transition ease-out duration-700"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-700"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-x-0 bottom-0 md:inset-0 z-50 overflow-hidden flex items-center md:my-4 justify-center transform  md:px-4"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition md:transition-none transform-gpu ease-in-out duration-700"
        enterStart="translate-y-full "
        enterEnd="translate-y-0"
        leave="transition md:transition-none transform-gpu ease-in-out duration-700"
        leaveStart="translate-y-0"
        leaveEnd="translate-y-full"
      >
        <div ref={modalContent} className="bg-gray-800 rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
          {/* Modal header */}
          <div className="px-5 py-3 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-white">{title}</div>
              <button className="text-slate-400 hover:text-slate-500" onClick={(e) => { e.stopPropagation(); setModalOpen(false); }}>
                <div className="sr-only">Close</div>
                <svg className="w-4 h-4 fill-white">
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                </svg>
              </button>
            </div>
          </div>
          {children}     
        </div>        
      </Transition>
    </>
  );
}

export default ModalBasic;
