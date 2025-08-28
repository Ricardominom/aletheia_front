import React, { useState, useEffect } from 'react';
import { Instagram, Users, Eye, Heart, MessageCircle, Video, Image, BarChart3, TrendingUp } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface InstagramMetrics {
  views: string;
  viewsFromAds: string;
  interactions: string;
  interactionsFromAds: string;
  newFollowers: number;
  contentShared: number;
  accountsReached: string;
  accountsReachedGrowth: string;
  audienceType: {
    followers: number;
    nonFollowers: number;
  };
  contentTypes: {
    posts: number;
    stories: number;
    reels: number;
    liveVideos: number;
    videos: number;
  };
  locations: {
    cochabamba: number;
    santaCruz: number;
    quillacollo: number;
    laPaz: number;
    sucre: number;
  };
  ageGroups: {
    '13-17': number;
    '18-24': number;
    '25-34': number;
    '35-44': number;
    '45-54': number;
  };
}

export default function InstagramMetricsCard() {
  const [metrics, setMetrics] = useState<InstagramMetrics>({
    views: '15,068,096',
    viewsFromAds: '77.9%',
    interactions: '65.8K',
    interactionsFromAds: '4.4%',
    newFollowers: 1047,
    contentShared: 362,
    accountsReached: '1,359,479',
    accountsReachedGrowth: '+15.6%',
    audienceType: {
      followers: 15.2,
      nonFollowers: 84.8,
    },
    contentTypes: {
      posts: 45.3,
      stories: 28.2,
      reels: 26.3,
      liveVideos: 0.2,
      videos: 0.0,
    },
    locations: {
      cochabamba: 54.5,
      santaCruz: 12.6,
      quillacollo: 5.4,
      laPaz: 4.9,
      sucre: 2.0,
    },
    ageGroups: {
      '13-17': 1.8,
      '18-24': 17.3,
      '25-34': 41.1,
      '35-44': 25.2,
      '45-54': 9.3,
    },
  });

  return (
    <div className="glassmorphic-container p-6 animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-600/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 p-3 rounded-lg border border-pink-500/20">
            <Instagram className="w-6 h-6 text-pink-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white text-neon">
              Instagram Insights
            </h2>
            <p className="text-gray-400 text-sm">Jul 20 - Aug 18</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Main Metrics Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Main Metrics - Reduced to half width */}
          <div className="col-span-6 grid grid-cols-2 gap-3">
            <div className="bg-card/50 rounded-lg p-3 border border-pink-500/20 group hover:border-pink-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-gray-400 uppercase">Views</span>
              </div>
              <div className="text-2xl font-bold text-pink-500 text-neon animate-float">
                6.0M
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-3 border border-pink-500/20 group hover:border-pink-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-gray-400 uppercase">Interactions</span>
              </div>
              <div className="text-2xl font-bold text-pink-500 text-neon animate-float">
                {metrics.interactions}
              </div>
              <div className="text-xs text-gray-400 mt-1">{metrics.interactionsFromAds} from ads</div>
            </div>

            <div className="bg-card/50 rounded-lg p-3 border border-pink-500/20 group hover:border-pink-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-gray-400 uppercase">New followers</span>
              </div>
              <div className="text-2xl font-bold text-pink-400 text-neon">
                {metrics.newFollowers.toLocaleString()}
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-3 border border-pink-500/20 group hover:border-pink-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-pink-400" />
                <span className="text-xs text-gray-400 uppercase">Content shared</span>
              </div>
              <div className="text-2xl font-bold text-pink-400 text-neon">
                {metrics.contentShared}
              </div>
            </div>
          </div>

          {/* Audience Type Distribution - Moved to the right side */}
          <div className="col-span-6 bg-card/50 rounded-lg p-4 border border-pink-500/20">
            <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase">Audience Type</h4>
            <div className="flex items-center justify-center gap-4 h-full">
              {/* Pie Chart */}
              <div className="w-24 h-24 relative">
                <Doughnut 
                  data={{
                   labels: ['Seguidores', 'No seguidores'],
                    datasets: [{
                      data: [metrics.audienceType.followers, metrics.audienceType.nonFollowers],
                      backgroundColor: ['#ec4899', '#8b5cf6'],
                      borderColor: ['#db2777', '#7c3aed'],
                      borderWidth: 2,
                      cutout: '60%',
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        backgroundColor: 'rgba(10, 10, 10, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(236, 72, 153, 0.2)',
                        borderWidth: 1,
                        callbacks: {
                          label: function(context: any) {
                           return `${context.label}: ${context.parsed}%`;
                          }
                        }
                      },
                    },
                  }}
                />
              </div>
              
              {/* Legend */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                   <span className="text-sm text-gray-300 font-medium">Seguidores</span>
                  </div>
                  <span className="text-lg font-bold text-pink-500">{metrics.audienceType.followers}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                   <span className="text-sm text-gray-300 font-medium">No seguidores</span>
                  </div>
                  <span className="text-lg font-bold text-purple-500">{metrics.audienceType.nonFollowers}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accounts Reached */}
        <div className="bg-background/30 rounded-lg p-3 border border-pink-500/20 mb-4">
          <div className="flex items-center justify-between">
            <div>
             <div className="text-sm text-gray-400 mb-1">Cuentas alcanzadas</div>
              <div className="text-xl font-bold text-pink-500">{metrics.accountsReached}</div>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="w-5 h-5" />
              <span className="text-base font-medium">{metrics.accountsReachedGrowth}</span>
            </div>
          </div>
        </div>

        {/* Content Performance and Locations in same row */}
        <div className="grid grid-cols-3 gap-4">
          {/* By Content Type */}
          <div className="bg-card/50 rounded-lg p-4 border border-pink-500/20">
           <h4 className="text-xs font-medium text-gray-400 mb-3 uppercase">Por tipo de contenido</h4>
            
            <div className="space-y-2">
              {Object.entries(metrics.contentTypes).map(([type, percentage]) => {
                const getLabel = () => {
                  switch (type) {
                   case 'posts': return 'Publicaciones';
                   case 'stories': return 'Historias';
                    case 'reels': return 'Reels';
                   case 'liveVideos': return 'Videos en vivo';
                    case 'videos': return 'Videos';
                    default: return type;
                  }
                };

                const getBarColor = () => {
                  switch (type) {
                    case 'posts': return 'bg-pink-500';
                    case 'stories': return 'bg-pink-400';
                    case 'reels': return 'bg-purple-500';
                    case 'liveVideos': return 'bg-purple-400';
                    case 'videos': return 'bg-purple-300';
                    default: return 'bg-pink-500';
                  }
                };

                return (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-xs text-gray-300 font-medium">{getLabel()}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-background/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getBarColor()} transition-all duration-300 relative`}
                          style={{ width: `${(percentage / 50) * 100}%` }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-pink-400 w-10 text-right">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Locations */}
          <div className="bg-card/50 rounded-lg p-4 border border-pink-500/20">
           <h4 className="text-xs font-medium text-gray-400 mb-3 uppercase">Principales ubicaciones</h4>
          
            <div className="space-y-2">
              {Object.entries(metrics.locations).map(([location, percentage]) => {
                const getLocationName = () => {
                  switch (location) {
                    case 'cochabamba': return 'Cochabamba';
                    case 'santaCruz': return 'Santa Cruz de la Sierra';
                    case 'quillacollo': return 'Quillacollo';
                    case 'laPaz': return 'La Paz';
                    case 'sucre': return 'Sucre';
                    default: return location;
                  }
                };

                return (
                  <div key={location} className="flex items-center justify-between">
                    <span className="text-xs text-gray-300 font-medium">{getLocationName()}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-background/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-pink-500 transition-all duration-300 relative"
                          style={{ width: `${(percentage / 60) * 100}%` }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-pink-400 w-10 text-right">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Age Range */}
          <div className="bg-card/50 rounded-lg p-4 border border-pink-500/20">
           <h4 className="text-xs font-medium text-gray-400 mb-3 uppercase">Rango de edad</h4>
          
            <div className="space-y-2">
              {Object.entries(metrics.ageGroups).map(([age, percentage]) => (
                <div key={age} className="flex items-center justify-between">
                  <span className="text-xs text-gray-300 font-medium">{age}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-background/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-pink-500 transition-all duration-300 relative"
                        style={{ width: `${(percentage / 45) * 100}%` }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-pink-400 w-10 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}