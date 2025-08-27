import React, { useState, useEffect } from 'react';
import { Facebook, Users, Eye, Heart, MessageCircle } from 'lucide-react';

interface FacebookMetrics {
  followers: number;
  reach: number;
  engagement: number;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
}

export default function FacebookMetricsCard() {
  const [metrics, setMetrics] = useState<FacebookMetrics>({
    followers: 45200,
    reach: 128500,
    engagement: 8.4,
    likes: 2340,
    comments: 456,
    shares: 189,
    impressions: 156700,
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
    <div className="glassmorphic-container p-6 h-[320px] animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-700/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-700/10 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/10 p-3 rounded-lg">
            <Facebook className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white text-neon">
              Facebook
            </h2>
            <p className="text-gray-400 text-sm">Métricas de la página oficial</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-500 text-neon">
            {(metrics.followers / 1000).toFixed(1)}K
          </div>
          <div className="text-xs text-gray-400">Seguidores</div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
        <div className="bg-card/50 rounded-lg p-4 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400 uppercase">Alcance</span>
          </div>
          <div className="text-xl font-bold text-blue-400 text-neon">
            {(metrics.reach / 1000).toFixed(1)}K
          </div>
        </div>

        <div className="bg-card/50 rounded-lg p-4 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400 uppercase">Engagement</span>
          </div>
          <div className="text-xl font-bold text-blue-400 text-neon">
            {metrics.engagement}%
          </div>
        </div>

        <div className="bg-card/50 rounded-lg p-4 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400 uppercase">Me Gusta</span>
          </div>
          <div className="text-lg font-bold text-white">
            {metrics.likes.toLocaleString()}
          </div>
        </div>

        <div className="bg-card/50 rounded-lg p-4 border border-blue-500/20 group hover:border-blue-500/40 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-400 uppercase">Comentarios</span>
          </div>
          <div className="text-lg font-bold text-white">
            {metrics.comments.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">{metrics.shares}</div>
          <div className="text-xs text-gray-400">Compartidos</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">{(metrics.impressions / 1000).toFixed(1)}K</div>
          <div className="text-xs text-gray-400">Impresiones</div>
        </div>
      </div>
    </div>
  );
}