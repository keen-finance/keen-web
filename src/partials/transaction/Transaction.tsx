import React, { useState } from 'react';



import TransactionTable from './TransactionTable';
import PaginationClassic from '../PaginationClassic';

function Transaction() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  return (
    <div className="py-8 w-full max-w-9xl mx-auto">
      <div className='h2 my-3'>交易</div>
      {/* More actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left side */}
        <div className="mb-4 sm:mb-0">
          <ul className="flex flex-wrap -m-1">
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-cyan-600 duration-150 ease-in-out">All <span className="ml-1 text-indigo-200"></span></button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1   shadow-sm bg-gray-800  duration-150 ease-in-out">BET <span className="ml-1 text-slate-400"></span></button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1   shadow-sm bg-gray-800  duration-150 ease-in-out">ACCEPT <span className="ml-1 text-slate-400"></span></button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1   shadow-sm bg-gray-800  duration-150 ease-in-out">ADD <span className="ml-1 text-slate-400"></span></button>
            </li>
            <li className="m-1">
              <button className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1   shadow-sm bg-gray-800  duration-150 ease-in-out">REMOVE <span className="ml-1 text-slate-400"></span></button>
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          
          {/* Dropdown */}
          {/* <DateSelect /> */}
          {/* Filter button */}
          {/* <FilterButton align="right" /> */}
        </div>

      </div>

      {/* Table */}
      <TransactionTable selectedItems={handleSelectedItems} />

      {/* Pagination */}
      <div className="mt-8">
      <PaginationClassic />
      </div>
    </div>
  );
}

export default Transaction;