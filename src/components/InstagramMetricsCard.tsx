import React, { useState, useEffect } from 'react';
import { Instagram, Users, Eye, Heart, MessageCircle } from 'lucide-react';

interface InstagramMetrics {
  const [loading, setLoading] = useState(false);
  engagement: number;
  likes: number;
  comments: number;
  stories: number;
  impressions: number;
}

export default function InstagramMetricsCard() {
  const [metrics, setMetrics] = useState<InstagramMetrics>({
    followers: 32800,
  // Using mock data directly since no backend is available
  const metrics = {
    followers: 45200,
    reach: 128500,
    engagement_rate: 4.8,
    likes: 8420,
    comments: 1250,
    stories: 24,
    impressions: 156300
  };

  return (
    <div className="glassmorphic-container p-6 h-[320px] animate-scale-in">
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
              Instagram
            </h2>
            <p className="text-gray-400 text-sm">Métricas del perfil oficial</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-pink-500 text-neon">
            {(metrics.followers / 1000).toFixed(1)}K
          </div>
          <div className="text-xs text-gray-400">Seguidores</div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
        <div className="bg-card/50 rounded-lg p-4 border border-pink-500/20 group hover:border-pink-500/40 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-gray-400 uppercase">Alcance</span>
          </div>
          <div className="text-xl font-bold text-pink-400 text-neon">
            {(metrics.reach / 1000).toFixed(1)}K
          </div>
        </div>

        <div className="bg-card/50 rounded-lg p-4 border border-pink-500/20 group hover:border-pink-500/40 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-gray-400 uppercase">Engagement</span>
          </div>
          <div className="text-xl font-bold text-pink-400 text-neon">
            {metrics.engagement}%
          </div>
        </div>

        <div className="bg-card/50 rounded-lg p-4 border border-pink-500/20 group hover:border-pink-500/40 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-gray-400 uppercase">Me Gusta</span>
          </div>
          <div className="text-lg font-bold text-white">
            {metrics.likes.toLocaleString()}
          </div>
        </div>

        <div className="bg-card/50 rounded-lg p-4 border border-pink-500/20 group hover:border-pink-500/40 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-pink-400" />
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
          <div className="text-lg font-bold text-pink-400">{metrics.stories}</div>
          <div className="text-xs text-gray-400">Stories</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-pink-400">{(metrics.impressions / 1000).toFixed(1)}K</div>
          <div className="text-xs text-gray-400">Impresiones</div>
        </div>
      </div>
    </div>
  );
}