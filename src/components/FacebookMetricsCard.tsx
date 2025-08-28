import React, { useState, useEffect } from 'react';
import { Facebook, Users, Eye, Heart, MessageCircle, Video, Image, BarChart3 } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface FacebookMetrics {
  postViews: string;
  profileViews: string;
  likes: string;
  comments: string;
  genderDistribution: {
    male: number;
    female: number;
  };
  contentTypes: {
    video: number;
    multiPhoto: number;
    photo: number;
    story: number;
  };
  audienceType: {
    followers: number;
    nonFollowers: number;
  };
  ageGroups: {
    '25-34': number;
    '35-44': number;
    'other': number;
    '45-54': number;
  };
  overallGender: {
    women: number;
    men: number;
  };
}

export default function FacebookMetricsCard() {
  const [metrics, setMetrics] = useState<FacebookMetrics>({
    postViews: '26M',
    profileViews: '192K',
    likes: '917K',
    comments: '115K',
    genderDistribution: {
      male: 60,
      female: 40,
    },
    contentTypes: {
      video: 67.2,
      multiPhoto: 13.5,
      photo: 7.3,
      story: 1.6,
    },
    audienceType: {
      followers: 10,
      nonFollowers: 90,
    },
    ageGroups: {
      '25-34': 31.4,
      '35-44': 29.2,
      'other': 23.4,
      '45-54': 16.0,
    },
    overallGender: {
      women: 52,
      men: 48,
    },
  });

  useEffect(() => {
    // Simulate API call - replace with actual API endpoint when available
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/social/facebook');
        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        }
      } catch (error) {
        // Use mock data if API fails
        console.log('Using mock Facebook data');
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="glassmorphic-container p-6 animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-700/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-700/10 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
            <Facebook className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white text-neon">
              Facebook Analytics
            </h2>
            <p className="text-gray-400 text-sm">Métricas detalladas de la página</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Main Metrics Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Main Metrics - Reduced to half width */}
          <div className="col-span-6 grid grid-cols-2 gap-3">
            <div className="bg-card/50 rounded-lg p-3 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400 uppercase">Post Views</span>
              </div>
              <div className="text-2xl font-bold text-blue-500 text-neon animate-float">
                {metrics.postViews}
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-3 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400 uppercase">Profile Views</span>
              </div>
              <div className="text-2xl font-bold text-blue-500 text-neon animate-float">
                {metrics.profileViews}
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-3 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400 uppercase">Likes</span>
              </div>
              <div className="text-2xl font-bold text-blue-400 text-neon">
                {metrics.likes}
              </div>
            </div>

            <div className="bg-card/50 rounded-lg p-3 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-400 uppercase">Comments</span>
              </div>
              <div className="text-2xl font-bold text-blue-400 text-neon">
                {metrics.comments}
              </div>
            </div>
          </div>

          {/* Gender Distribution - Moved to the right side */}
          <div className="col-span-6 bg-card/50 rounded-lg p-4 border border-blue-500/20">
            <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase">Gender Distribution</h4>
            <div className="flex items-center justify-center gap-4 h-full min-h-[120px]">
              {/* Pie Chart */}
              <div className="w-24 h-24 relative">
                <Doughnut 
                  data={{
                    labels: ['Male', 'Female'],
                    datasets: [{
                      data: [metrics.genderDistribution.male, metrics.genderDistribution.female],
                      backgroundColor: ['#2563eb', '#60a5fa'],
                      borderColor: ['#1d4ed8', '#3b82f6'],
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
                        borderColor: 'rgba(37, 99, 235, 0.2)',
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
                    <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    <span className="text-sm text-gray-300 font-medium">Male</span>
                  </div>
                  <span className="text-lg font-bold text-blue-500">{metrics.genderDistribution.male}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span className="text-sm text-gray-300 font-medium">Female</span>
                  </div>
                  <span className="text-lg font-bold text-blue-400">{metrics.genderDistribution.female}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Performance */}
        {/* Content Performance and Age Distribution in same row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Content Performance */}
          <div className="bg-card/50 rounded-lg p-3 border border-blue-500/20">
            <h4 className="text-xs font-medium text-gray-400 mb-2 uppercase">Content Performance</h4>
            
            {/* Followers/Non-followers header */}
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-blue-500/10">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-medium text-green-500">10% Followers</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <span className="text-xs font-medium text-blue-600">90% Non-followers</span>
              </div>
            </div>
            
            <div className="space-y-1.5">
              {Object.entries(metrics.contentTypes).map(([type, percentage]) => {
                const getIcon = () => {
                  switch (type) {
                    case 'video': return <Video className="w-3 h-3 text-blue-500" />;
                    case 'multiPhoto': return <Image className="w-3 h-3 text-blue-400" />;
                    case 'photo': return <Image className="w-3 h-3 text-blue-300" />;
                    case 'story': return <BarChart3 className="w-3 h-3 text-blue-200" />;
                    default: return <BarChart3 className="w-3 h-3 text-blue-500" />;
                  }
                };

                const getLabel = () => {
                  switch (type) {
                    case 'video': return 'Video';
                    case 'multiPhoto': return 'Multi Photo';
                    case 'photo': return 'Photo';
                    case 'story': return 'Story';
                    default: return type;
                  }
                };

                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {getIcon()}
                      <span className="text-xs text-gray-300">{getLabel()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-background/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${(percentage / 70) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-blue-400 w-10 text-right">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Age and Gender Distribution */}
          <div className="bg-card/50 rounded-lg p-3 border border-blue-500/20">
            <h4 className="text-xs font-medium text-gray-400 mb-2 uppercase">
              Age and Gender Distribution
            </h4>
            <div className="mb-2 text-center">
              <span className="text-xs text-blue-400">{metrics.overallGender.women}% Women</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-xs text-blue-600">{metrics.overallGender.men}% Men</span>
            </div>
            <div className="space-y-1.5">
              {Object.entries(metrics.ageGroups).map(([age, percentage]) => (
                <div key={age} className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">{age}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-background/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${(percentage / 35) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-blue-400 w-10 text-right">
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