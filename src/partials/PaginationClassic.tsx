import React from 'react';

function PaginationClassic() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            <a className="btn bg-cyan-900  text-white cursor-not-allowed" href="#0" disabled>&lt;- Previous</a>
          </li>
          <li className="ml-3 first:ml-0">
            <a className="btn bg-cyan-600  text-white" href="#0">Next -&gt;</a>
          </li>
        </ul>
      </nav>
      <div className="text-sm text-slate-500 text-center sm:text-left">
        Showing <span className="font-medium text-slate-600">1</span> to <span className="font-medium text-slate-600">10</span> of <span className="font-medium text-slate-600">467</span> results
      </div>
    </div>
  );
}

export default PaginationClassic;
