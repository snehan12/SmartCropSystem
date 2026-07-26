import React, { useState } from 'react';
import { Loader2, Beaker, Thermometer, Droplets, FlaskConical } from 'lucide-react';
import { SoilData, CropRecommendation } from '../App';
import { analyzeSoilJSON } from '../utils/api';

interface SoilInputFormProps {
  onRecommendation: (data: CropRecommendation) => void;
}

const SoilInputForm: React.FC<SoilInputFormProps> = ({ onRecommendation }) => {
  const [formData, setFormData] = useState<SoilData>({
    N: 90,
    P: 42,
    K: 43,
    temperature: 20.8,
    humidity: 82.0,
    ph: 6.5,
    rainfall: 202.9
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof SoilData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeSoilJSON(formData);
      onRecommendation(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    {
      key: 'N' as keyof SoilData,
      label: 'Nitrogen (N)',
      icon: <Beaker className="h-5 w-5 text-blue-600" />,
      unit: 'kg/ha',
      min: 0,
      max: 140,
      step: 1,
      description: 'Essential for leaf growth and protein synthesis'
    },
    {
      key: 'P' as keyof SoilData,
      label: 'Phosphorus (P)',
      icon: <FlaskConical className="h-5 w-5 text-purple-600" />,
      unit: 'kg/ha',
      min: 5,
      max: 145,
      step: 1,
      description: 'Important for root development and energy transfer'
    },
    {
      key: 'K' as keyof SoilData,
      label: 'Potassium (K)',
      icon: <Beaker className="h-5 w-5 text-orange-600" />,
      unit: 'kg/ha',
      min: 5,
      max: 205,
      step: 1,
      description: 'Regulates water uptake and disease resistance'
    },
    {
      key: 'temperature' as keyof SoilData,
      label: 'Temperature',
      icon: <Thermometer className="h-5 w-5 text-red-500" />,
      unit: '°C',
      min: 8,
      max: 45,
      step: 0.1,
      description: 'Average temperature affects crop growth rates'
    },
    {
      key: 'humidity' as keyof SoilData,
      label: 'Humidity',
      icon: <Droplets className="h-5 w-5 text-cyan-600" />,
      unit: '%',
      min: 14,
      max: 100,
      step: 0.1,
      description: 'Relative humidity impacts plant transpiration'
    },
    {
      key: 'ph' as keyof SoilData,
      label: 'pH Level',
      icon: <FlaskConical className="h-5 w-5 text-green-600" />,
      unit: '',
      min: 3.5,
      max: 10,
      step: 0.1,
      description: 'Soil acidity/alkalinity affects nutrient availability'
    },
    {
      key: 'rainfall' as keyof SoilData,
      label: 'Rainfall',
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      unit: 'mm',
      min: 20,
      max: 300,
      step: 0.1,
      description: 'Annual precipitation levels in your area'
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Soil & Climate Analysis
          </h1>
          <p className="text-xl text-gray-600">
            Enter your soil and environmental parameters to get personalized crop recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {inputFields.map((field) => (
              <div key={field.key} className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    {field.icon}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900">
                      {field.label} {field.unit && `(${field.unit})`}
                    </label>
                    <p className="text-xs text-gray-500">{field.description}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    type="number"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={formData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-sm text-gray-400 font-medium">{field.unit}</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, ((formData[field.key] - field.min) / (field.max - field.min)) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none inline-flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Analyzing Soil...
                </>
              ) : (
                'Get Crop Recommendation'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SoilInputForm;