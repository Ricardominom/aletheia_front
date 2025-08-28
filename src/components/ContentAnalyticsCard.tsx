import React, { useState, useEffect } from 'react';
import { FileText, BarChart3 } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ContentData {
  publicaciones: {
    estrategicas: number;
    historiasTiktok: number;
    campanasBanners: number;
    total: number;
  };
  estudios: {
    actualizacionesAntropologicas: number;
    socialListenings: number;
    total: number;
  };
  dateRange: string;
}

export default function ContentAnalyticsCard() {
  const [data, setData] = useState<ContentData>({
    publicaciones: {
      estrategicas: 781,
      historiasTiktok: 282,
      campanasBanners: 73,
      total: 1136,
    },
    estudios: {
      actualizacionesAntropologicas: 22,
      socialListenings: 75,
      total: 97,
    },
    dateRange: 'Corte de febrero a agosto de 2025'
  });

  const formatNumber = (num: number) => {
    return num.toLocaleString('es-ES');
  };

  // Data for the doughnut chart
  const chartData = {
    labels: ['Estratégicas', 'Historias TikTok', 'Campañas de banners'],
    datasets: [{
      data: [data.publicaciones.estrategicas, data.publicaciones.historiasTiktok, data.publicaciones.campanasBanners],
      backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4'],
      borderColor: ['#2563eb', '#7c3aed', '#0891b2'],
      borderWidth: 2,
      cutout: '60%',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#94a3b8',
          font: {
            size: 11,
          },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(10, 10, 10, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: function(context: any) {
            const percentage = ((context.parsed / data.publicaciones.total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <div className="glassmorphic-container p-4 animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-2 rounded-lg border border-blue-500/20">
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white text-neon">
              Contenidos
            </h2>
            <p className="text-gray-400 text-xs">Histórico de contenidos producidos</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">{data.dateRange}</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-500/30">
              <img
                src="https://raw.githubusercontent.com/Nefta11/MiPortafolioNefta/refs/heads/main/assets/Manfred%20Reyes%20Villa.jpg"
                alt="Manfred Reyes Villa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-white">Manfred</div>
              <div className="text-xs font-medium text-white">Reyes Villa</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left side - Tables */}
          <div className="space-y-4">
            {/* Publicaciones Table */}
            <div className="bg-card/50 rounded-lg border border-blue-500/20">
              <div className="p-2 border-b border-blue-500/20">
                <h3 className="text-sm font-semibold text-white">Publicaciones</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-blue-500/20 bg-blue-500/5">
                      <th className="text-left p-2 text-gray-300 font-medium text-xs">Tipo</th>
                      <th className="text-right p-2 text-gray-300 font-medium text-xs">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-500/10">
                    <tr className="hover:bg-blue-500/5 transition-colors">
                      <td className="p-2 text-white font-medium text-xs">Estratégicas</td>
                      <td className="p-2 text-right text-blue-400 font-medium text-xs">
                        {formatNumber(data.publicaciones.estrategicas)}
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-500/5 transition-colors">
                      <td className="p-2 text-white font-medium text-xs">Historias TikTok</td>
                      <td className="p-2 text-right text-blue-400 font-medium text-xs">
                        {formatNumber(data.publicaciones.historiasTiktok)}
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-500/5 transition-colors">
                      <td className="p-2 text-white font-medium text-xs">Campañas de banners</td>
                      <td className="p-2 text-right text-blue-400 font-medium text-xs">
                        {formatNumber(data.publicaciones.campanasBanners)}
                      </td>
                    </tr>
                    <tr className="border-t-2 border-blue-500/30 bg-blue-500/10">
                      <td className="p-2 text-white font-bold text-xs">Total</td>
                      <td className="p-2 text-right text-blue-400 font-bold text-xs">
                        {formatNumber(data.publicaciones.total)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Estudios Table */}
            <div className="bg-card/50 rounded-lg border border-purple-500/20">
              <div className="p-2 border-b border-purple-500/20">
                <h3 className="text-sm font-semibold text-white">Estudios</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-purple-500/20 bg-purple-500/5">
                      <th className="text-left p-2 text-gray-300 font-medium text-xs">Tipo</th>
                      <th className="text-right p-2 text-gray-300 font-medium text-xs">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    <tr className="hover:bg-purple-500/5 transition-colors">
                      <td className="p-2 text-white font-medium text-xs">Actualizaciones antropológicas</td>
                      <td className="p-2 text-right text-purple-400 font-medium text-xs">
                        {formatNumber(data.estudios.actualizacionesAntropologicas)}
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-500/5 transition-colors">
                      <td className="p-2 text-white font-medium text-xs">Social Listenings</td>
                      <td className="p-2 text-right text-purple-400 font-medium text-xs">
                        {formatNumber(data.estudios.socialListenings)}
                      </td>
                    </tr>
                    <tr className="border-t-2 border-purple-500/30 bg-purple-500/10">
                      <td className="p-2 text-white font-bold text-xs">Total</td>
                      <td className="p-2 text-right text-purple-400 font-bold text-xs">
                        {formatNumber(data.estudios.total)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right side - Chart */}
          <div className="bg-card/50 rounded-lg border border-blue-500/20 p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase text-center">Distribución de Publicaciones</h4>
            <div className="h-48 flex items-center justify-center">
              <div className="w-full h-full">
                <Doughnut 
                  data={chartData}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}