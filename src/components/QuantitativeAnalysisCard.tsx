import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

interface MicrosegmentData {
  name: string;
  investment: number;
  share: number;
}

interface GeolocationData {
  name: string;
  investment: number;
  share: number;
}

interface QuantitativeAnalysisData {
  microsegments: MicrosegmentData[];
  geolocations: GeolocationData[];
  totalInvestment: number;
  totalImpressions: number;
  dateRange: string;
}

export default function QuantitativeAnalysisCard() {
  const [data, setData] = useState<QuantitativeAnalysisData>({
    microsegments: [
      { name: 'General', investment: 301012, share: 40.0 },
      { name: 'Animalistas', investment: 22576, share: 3.0 },
      { name: 'Centenials', investment: 37627, share: 5.0 },
      { name: 'Deportistas', investment: 22576, share: 3.0 },
      { name: 'Estudiantes', investment: 45152, share: 6.0 },
      { name: 'Mujeres', investment: 52677, share: 7.0 },
      { name: 'Emprendedores', investment: 22576, share: 3.0 },
      { name: 'Religiosos', investment: 22576, share: 3.0 },
      { name: 'Agricultores', investment: 37627, share: 5.0 },
      { name: 'Geeks', investment: 22576, share: 3.0 },
      { name: 'Médicos', investment: 22576, share: 3.0 },
      { name: 'Comerciantes', investment: 22576, share: 3.0 },
      { name: 'Amas de Casa', investment: 37627, share: 5.0 },
      { name: 'Transportistas', investment: 30101, share: 4.0 },
      { name: 'Tercera Edad', investment: 30101, share: 4.0 },
      { name: 'Franja Pobresa urbana', investment: 22576, share: 3.0 },
    ],
    geolocations: [
      { name: 'Nacional', investment: 489145, share: 65.0 },
      { name: 'Cochabamba', investment: 45152, share: 6.0 },
      { name: 'Sucre', investment: 15051, share: 2.0 },
      { name: 'Santa Cruz', investment: 52677, share: 7.0 },
      { name: 'El Alto', investment: 30101, share: 4.0 },
      { name: 'Tarija', investment: 22576, share: 3.0 },
      { name: 'Oruro', investment: 15051, share: 2.0 },
      { name: 'Beni', investment: 7525, share: 1.0 },
      { name: 'Potosí', investment: 22576, share: 3.0 },
      { name: 'Pando', investment: 15051, share: 2.0 },
      { name: 'La Paz', investment: 22576, share: 3.0 },
      { name: 'Chuquisaca', investment: 15051, share: 2.0 },
    ],
    totalInvestment: 752530,
    totalImpressions: 486639245,
    dateRange: 'Corte de febrero a agosto de 2025'
  });

  useEffect(() => {
    // Simulate API call - replace with actual API endpoint when available
    const fetchData = async () => {
      try {
        const response = await fetch('/api/social/quantitative-analysis');
        if (response.ok) {
          const apiData = await response.json();
          setData(apiData);
        }
      } catch (error) {
        // Use mock data if API fails
        console.log('Using mock quantitative analysis data');
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('es-ES')}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('es-ES');
  };

  return (
    <div className="glassmorphic-container p-6 animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-3 rounded-lg border border-blue-500/20">
            <BarChart3 className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white text-neon">
              Análisis Cuantitativo
            </h2>
            <p className="text-gray-400 text-sm">Histórico de inversión por microsegmentos y geolocalización (USD)</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">{data.dateRange}</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/30">
              <img
                src="https://raw.githubusercontent.com/Nefta11/MiPortafolioNefta/refs/heads/main/assets/Manfred%20Reyes%20Villa.jpg"
                alt="Manfred Reyes Villa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-white">Manfred</div>
              <div className="text-sm font-medium text-white">Reyes Villa</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Microsegmentos Table */}
          <div className="bg-card/50 rounded-lg border border-blue-500/20">
            <div className="p-4 border-b border-blue-500/20">
              <h3 className="text-lg font-semibold text-white">Microsegmentos</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-500/20 bg-blue-500/5">
                    <th className="text-left p-3 text-gray-300 font-medium">Microsegmentos</th>
                    <th className="text-right p-3 text-gray-300 font-medium">Inversión</th>
                    <th className="text-right p-3 text-gray-300 font-medium">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-500/10">
                  {data.microsegments.map((segment, index) => (
                    <tr key={index} className="hover:bg-blue-500/5 transition-colors">
                      <td className="p-3 text-white font-medium">{segment.name}</td>
                      <td className="p-3 text-right text-blue-400 font-medium">
                        {formatCurrency(segment.investment)}
                      </td>
                      <td className="p-3 text-right text-blue-300 font-medium">
                        {segment.share.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-blue-500/30 bg-blue-500/10">
                    <td className="p-3 text-white font-bold">Total</td>
                    <td className="p-3 text-right text-blue-400 font-bold">
                      {formatCurrency(data.totalInvestment)}
                    </td>
                    <td className="p-3 text-right text-blue-300 font-bold">100.00%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Geolocalización Table */}
          <div className="bg-card/50 rounded-lg border border-purple-500/20">
            <div className="p-4 border-b border-purple-500/20">
              <h3 className="text-lg font-semibold text-white">Geolocalización</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/20 bg-purple-500/5">
                    <th className="text-left p-3 text-gray-300 font-medium">Geolocalización</th>
                    <th className="text-right p-3 text-gray-300 font-medium">Inversión</th>
                    <th className="text-right p-3 text-gray-300 font-medium">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/10">
                  {data.geolocations.map((location, index) => (
                    <tr key={index} className="hover:bg-purple-500/5 transition-colors">
                      <td className="p-3 text-white font-medium">{location.name}</td>
                      <td className="p-3 text-right text-purple-400 font-medium">
                        {formatCurrency(location.investment)}
                      </td>
                      <td className="p-3 text-right text-purple-300 font-medium">
                        {location.share.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-purple-500/30 bg-purple-500/10">
                    <td className="p-3 text-white font-bold">Total</td>
                    <td className="p-3 text-right text-purple-400 font-bold">
                      {formatCurrency(data.totalInvestment)}
                    </td>
                    <td className="p-3 text-right text-purple-300 font-bold">100.00%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Impressions Summary */}
        <div className="bg-card/50 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Impresiones Totales</h3>
                <p className="text-gray-400 text-sm">Alcance total de la campaña</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-500 text-neon">
                {formatNumber(data.totalImpressions)}
              </div>
              <div className="text-sm text-gray-400">impresiones</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}