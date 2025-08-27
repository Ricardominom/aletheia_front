import React, { useState, useEffect } from 'react';
import { Facebook, Users, Eye, Heart, MessageCircle, Share2, BarChart3, TrendingUp } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface FacebookMetrics {
  pageViews: string;
  pageViewsFromAds: string;
  postReach: string;
  postReachFromAds: string;
  newLikes: number;
  postEngagement: number;
  impressions: string;
  impressionsGrowth: string;
  audienceType: {
    fans: number;
    nonFans: number;
  };
  contentTypes: {
    photos: number;
    videos: number;
    links: number;
    status: number;
    events: number;
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
    '55-64': number;
    '65+': number;
  };
}

export default function FacebookMetricsCard() {
  const [metrics, setMetrics] = useState<FacebookMetrics>({
    pageViews: '8,245,320',
    pageViewsFromAds: '62.3%',
    postReach: '892.4K',
    postReachFromAds: '18.7%',
    newLikes: 2847,
    postEngagement: 1284,
    impressions: '2,847,592',
    impressionsGrowth: '+22.4%',
    audienceType: {
      fans: 42.8,
      nonFans: 57.2,
    },
    contentTypes: {
      photos: 38.7,
      videos: 31.2,
      links: 15.8,
      status: 12.1,
      events: 2.2,
    },
    locations: {
      cochabamba: 48.3,
      santaCruz: 18.9,
      quillacollo: 8.7,
      laPaz: 12.4,
      sucre: 6.2,
    },
    ageGroups: {
      '13-17': 3.2,
      '18-24': 22.8,
      '25-34': 35.6,
      '35-44': 21.7,
      '45-54': 12.4,
      '55-64': 3.8,
      '65+': 0.5,
    },
  });

  return (
    <div className="glassmorphic-container p-6 animate-scale-in h-[900px] overflow-y-auto">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-700/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-700/10 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-700/10 p-3 rounded-lg border border-blue-500/20">
            <Facebook className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white text-neon">
              Facebook Insights
            </h2>
            <p className="text-gray-400 text-sm">Jul 20 - Aug 18</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Main Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card/50 rounded-lg p-4 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400 uppercase">Page Views</span>
            </div>
            <div className="text-2xl font-bold text-blue-500 text-neon animate-float">
              8.2M
            </div>
          </div>

          <div className="bg-card/50 rounded-lg p-4 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400 uppercase">Post Reach</span>
            </div>
            <div className="text-2xl font-bold text-blue-500 text-neon animate-float">
              {metrics.postReach}
            </div>
            <div className="text-xs text-gray-400 mt-1">{metrics.postReachFromAds} from ads</div>
          </div>

          <div className="bg-card/50 rounded-lg p-4 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400 uppercase">New Likes</span>
            </div>
            <div className="text-2xl font-bold text-blue-400 text-neon">
              {metrics.newLikes.toLocaleString()}
            </div>
          </div>

          <div className="bg-card/50 rounded-lg p-4 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400 uppercase">Post Engagement</span>
            </div>
            <div className="text-2xl font-bold text-blue-400 text-neon">
              {metrics.postEngagement.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Page Views Section - Combined card with impressions and content type */}
        <div className="bg-card/50 rounded-lg p-6 border border-blue-500/20">
          <h4 className="text-lg font-semibold text-white mb-6 text-neon">Page Views</h4>
          
          {/* Main Page Views Display */}
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-500 text-neon mb-2">
              {metrics.pageViews}
            </div>
            <div className="text-lg text-gray-300 mb-1">Page Views</div>
            <div className="text-sm text-gray-400">{metrics.pageViewsFromAds} from ads</div>
          </div>

          {/* Audience Type Pie Chart */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-32 h-32 relative">
              <Doughnut 
                data={{
                  labels: ['Fans', 'Non-fans'],
                  datasets: [{
                    data: [metrics.audienceType.fans, metrics.audienceType.nonFans],
                    backgroundColor: ['#3b82f6', '#1e40af'],
                    borderColor: ['#2563eb', '#1d4ed8'],
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
                      borderColor: 'rgba(59, 130, 246, 0.2)',
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
            <div className="space-y-3">
              <div className="flex items-center justify-between min-w-[140px]">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-300 font-medium">Fans</span>
                </div>
                <span className="text-lg font-bold text-blue-500">{metrics.audienceType.fans}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-700"></div>
                  <span className="text-sm text-gray-300 font-medium">Non-fans</span>
                </div>
                <span className="text-lg font-bold text-blue-700">{metrics.audienceType.nonFans}%</span>
              </div>
            </div>
          </div>

          {/* Impressions */}
          <div className="bg-background/30 rounded-lg p-4 border border-blue-500/20 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400 mb-1">Total Impressions</div>
                <div className="text-2xl font-bold text-blue-500">{metrics.impressions}</div>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <TrendingUp className="w-5 h-5" />
                <span className="text-lg font-medium">{metrics.impressionsGrowth}</span>
              </div>
            </div>
          </div>

          {/* By Content Type */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">By content type</h5>
            
            <div className="space-y-3">
              {Object.entries(metrics.contentTypes).map(([type, percentage]) => {
                const getLabel = () => {
                  switch (type) {
                    case 'photos': return 'Photos';
                    case 'videos': return 'Videos';
                    case 'links': return 'Links';
                    case 'status': return 'Status Updates';
                    case 'events': return 'Events';
                    default: return type;
                  }
                };

                const getBarColor = () => {
                  switch (type) {
                    case 'photos': return 'bg-blue-500';
                    case 'videos': return 'bg-blue-400';
                    case 'links': return 'bg-blue-600';
                    case 'status': return 'bg-blue-300';
                    case 'events': return 'bg-blue-700';
                    default: return 'bg-blue-500';
                  }
                };

                return (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300 font-medium">{getLabel()}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-40 h-3 bg-background/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getBarColor()} transition-all duration-300 relative`}
                          style={{ width: `${(percentage / 40) * 100}%` }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-blue-400 w-12 text-right">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Post Reach Section */}
        <div className="bg-card/50 rounded-lg p-6 border border-blue-500/20">
          <h4 className="text-lg font-semibold text-white mb-4 text-neon">Post Reach</h4>
          
          {/* Main Post Reach Display */}
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-500 text-neon mb-2">
              {metrics.postReach}
            </div>
            <div className="text-lg text-gray-300 mb-1">Post Reach</div>
            <div className="text-sm text-gray-400">{metrics.postReachFromAds} from ads</div>
          </div>

          {/* Post Reach Audience Type Pie Chart */}
          <div className="flex items-center justify-center gap-6">
            <div className="w-32 h-32 relative">
              <Doughnut 
                data={{
                  labels: ['Fans', 'Non-fans'],
                  datasets: [{
                    data: [68.4, 31.6],
                    backgroundColor: ['#3b82f6', '#1e40af'],
                    borderColor: ['#2563eb', '#1d4ed8'],
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
                      borderColor: 'rgba(59, 130, 246, 0.2)',
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
            <div className="space-y-3">
              <div className="flex items-center justify-between min-w-[140px]">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-300 font-medium">Fans</span>
                </div>
                <span className="text-lg font-bold text-blue-500">68.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-blue-700"></div>
                  <span className="text-sm text-gray-300 font-medium">Non-fans</span>
                </div>
                <span className="text-lg font-bold text-blue-700">31.6%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="bg-card/50 rounded-lg p-4 border border-blue-500/20">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase">Top Locations</h4>
          
          <div className="space-y-3">
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
                  <span className="text-sm text-gray-300 font-medium">{getLocationName()}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-40 h-3 bg-background/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300 relative"
                        style={{ width: `${(percentage / 50) * 100}%` }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-blue-400 w-12 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Age Range */}
        <div className="bg-card/50 rounded-lg p-4 border border-blue-500/20">
          <h4 className="text-lg font-semibold text-white mb-4 text-neon">Age range</h4>
          
          <div className="space-y-3">
            {Object.entries(metrics.ageGroups).map(([age, percentage]) => (
              <div key={age} className="flex items-center justify-between">
                <span className="text-sm text-gray-300 font-medium">{age}</span>
                <div className="flex items-center gap-3">
                  <div className="w-40 h-3 bg-background/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-300 relative"
                      style={{ width: `${(percentage / 40) * 100}%` }}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-blue-400 w-12 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}