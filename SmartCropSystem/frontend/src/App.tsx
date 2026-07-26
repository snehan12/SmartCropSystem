import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import SoilInputForm from './components/SoilInputForm';
import ResultsPage from './components/ResultsPage';

export type SoilData = {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
};

export type CropRecommendation = {
  crop: string;
  explanation: string;
  water_footprint: {
    blue_water: number;
    green_water: number;
    grey_water: number;
    total_water_footprint: number;
  };
  water_saving_suggestions: string[];
  inputData: SoilData;
};

type Page = 'home' | 'input' | 'results';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [recommendation, setRecommendation] = useState<CropRecommendation | null>(null);

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
  };

  const handleRecommendation = (data: CropRecommendation) => {
    setRecommendation(data);
    setCurrentPage('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Header currentPage={currentPage} onNavigate={navigateToPage} />
      
      <main className="relative">
        {currentPage === 'home' && (
          <HomePage onGetStarted={() => navigateToPage('input')} />
        )}
        
        {currentPage === 'input' && (
          <SoilInputForm onRecommendation={handleRecommendation} />
        )}
        
        {currentPage === 'results' && recommendation && (
          <ResultsPage 
            recommendation={recommendation} 
            onNewAnalysis={() => navigateToPage('input')}
          />
        )}
      </main>
    </div>
  );
}

export default App;