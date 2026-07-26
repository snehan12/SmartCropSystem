import React from 'react';
import { ArrowLeft, Leaf, Droplets, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { CropRecommendation } from '../App';

interface ResultsPageProps {
  recommendation: CropRecommendation;
  onNewAnalysis: () => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ recommendation, onNewAnalysis }) => {
  const { crop, explanation, water_footprint, water_saving_suggestions, inputData } = recommendation;

  const getWaterFootprintColor = (value: number) => {
    if (value > 1500) return 'text-red-600 bg-red-50 border-red-200';
    if (value > 1000) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getWaterFootprintIcon = (value: number) => {
    if (value > 1500) return <AlertTriangle className="h-5 w-5" />;
    if (value > 1000) return <Info className="h-5 w-5" />;
    return <CheckCircle className="h-5 w-5" />;
  };

  const waterTypes = [
    {
      name: 'Blue Water',
      value: water_footprint.blue_water,
      color: 'bg-blue-500',
      description: 'Freshwater consumed from rivers, lakes, and groundwater'
    },
    {
      name: 'Green Water',
      value: water_footprint.green_water,
      color: 'bg-green-500',
      description: 'Rainwater stored in soil and consumed by plants'
    },
    {
      name: 'Grey Water',
      value: water_footprint.grey_water,
      color: 'bg-gray-500',
      description: 'Water needed to dilute pollutants to acceptable levels'
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onNewAnalysis}
            className="inline-flex items-center text-green-700 hover:text-green-800 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analysis
          </button>
        </div>

        {/* Recommended Crop Card */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center mb-4">
            <div className="bg-white/20 p-3 rounded-xl mr-4">
              <Leaf className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Recommended Crop</h1>
              <p className="text-green-100">Based on your soil and climate conditions</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-4xl font-bold text-center mb-4 capitalize">{crop}</h2>
            <p className="text-green-100 text-center text-lg">
              This crop is perfectly suited for your environmental conditions
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Explanation Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600" />
              Why This Crop?
            </h3>
            <div className="prose prose-sm text-gray-700">
              {explanation.split('\n').map((line, index) => (
                <p key={index} className="mb-2 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Input Parameters Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Soil Parameters</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Nitrogen (N)</div>
                <div className="text-lg font-bold text-gray-900">{inputData.N} kg/ha</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Phosphorus (P)</div>
                <div className="text-lg font-bold text-gray-900">{inputData.P} kg/ha</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Potassium (K)</div>
                <div className="text-lg font-bold text-gray-900">{inputData.K} kg/ha</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Temperature</div>
                <div className="text-lg font-bold text-gray-900">{inputData.temperature}°C</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="text-lg font-bold text-gray-900">{inputData.humidity}%</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-sm text-gray-600">pH Level</div>
                <div className="text-lg font-bold text-gray-900">{inputData.ph}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Water Footprint Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Droplets className="h-5 w-5 mr-2 text-blue-600" />
              Water Footprint Analysis
            </h3>
            <div className={`flex items-center px-4 py-2 rounded-full border ${getWaterFootprintColor(water_footprint.total_water_footprint)}`}>
              {getWaterFootprintIcon(water_footprint.total_water_footprint)}
              <span className="ml-2 font-semibold">
                {water_footprint.total_water_footprint} L/kg
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {waterTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <div className={`w-4 h-4 rounded-full ${type.color} mr-3`}></div>
                  <h4 className="font-semibold text-gray-900">{type.name}</h4>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {type.value} L/kg
                </div>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>

          {/* Water Usage Visualization */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Water Usage Breakdown</h4>
            <div className="flex rounded-lg overflow-hidden h-4 mb-2">
              <div
                className="bg-blue-500"
                style={{ 
                  width: `${(water_footprint.blue_water / water_footprint.total_water_footprint) * 100}%` 
                }}
              ></div>
              <div
                className="bg-green-500"
                style={{ 
                  width: `${(water_footprint.green_water / water_footprint.total_water_footprint) * 100}%` 
                }}
              ></div>
              <div
                className="bg-gray-500"
                style={{ 
                  width: `${(water_footprint.grey_water / water_footprint.total_water_footprint) * 100}%` 
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Blue: {((water_footprint.blue_water / water_footprint.total_water_footprint) * 100).toFixed(1)}%</span>
              <span>Green: {((water_footprint.green_water / water_footprint.total_water_footprint) * 100).toFixed(1)}%</span>
              <span>Grey: {((water_footprint.grey_water / water_footprint.total_water_footprint) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Water Saving Suggestions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            Water Conservation Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {water_saving_suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start p-4 bg-green-50 rounded-xl border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-800 leading-relaxed">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-8">
          <button
            onClick={onNewAnalysis}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Analyze Another Soil Sample
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;