import React from 'react';
import { Leaf, Home, Calculator, BarChart3 } from 'lucide-react';

type Page = 'home' | 'input' | 'results';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SmartCrop</h1>
              <p className="text-xs text-gray-600">Smart Agriculture Solutions</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                currentPage === 'home'
                  ? 'text-green-700 bg-green-100'
                  : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="font-medium">Home</span>
            </button>
            
            <button
              onClick={() => onNavigate('input')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                currentPage === 'input'
                  ? 'text-green-700 bg-green-100'
                  : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span className="font-medium">Analyze Soil</span>
            </button>
            
            {currentPage === 'results' && (
              <button
                onClick={() => onNavigate('results')}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-green-700 bg-green-100"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="font-medium">Results</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;