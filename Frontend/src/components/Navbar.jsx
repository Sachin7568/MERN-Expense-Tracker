import React from 'react';

const Navbar = () => {
  // Format today's date
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <nav className="bg-gray-800/40 backdrop-blur-md border-b border-gray-700/40 px-6 py-4 rounded-2xl mb-8 flex items-center justify-between shadow-lg">
      
      {/* Brand & Live Sync Status */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-linear-to-tr from-emerald-500 to-blue-600 rounded-xl text-white shadow-md shadow-emerald-500/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500 tracking-tight">
            Tracker Pay
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Live Database Sync</span>
          </div>
        </div>
      </div>

      {/* Date & User Avatar */}
      <div className="flex items-center gap-4">
        {/* Date Display */}
        <div className="hidden sm:flex flex-col text-right">
          <span className="text-xs text-gray-400 font-medium">Today is</span>
          <span className="text-sm text-gray-200 font-bold">{today}</span>
        </div>
        
        {/* Visual Divider */}
        <div className="hidden sm:block h-8 w-px bg-gray-700/60"></div>

        {/* User initials avatar */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-between text-white font-bold border border-blue-500/20 shadow-md">
            <span className="mx-auto select-none">SK</span>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
