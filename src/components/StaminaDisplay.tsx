'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus } from 'lucide-react';

interface StaminaDisplayProps {
  current: number;
  max: number;
  onShopClick?: () => void;
}

export const StaminaDisplay: React.FC<StaminaDisplayProps> = ({ 
  current, 
  max,
  onShopClick
}) => {
  const percentage = (current / max) * 100;
  
  // 根据体力百分比确定颜色
  const getStaminaColor = () => {
    if (percentage > 60) return 'text-emerald-400';
    if (percentage > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGlowColor = () => {
    if (percentage > 60) return 'shadow-emerald-400/50';
    if (percentage > 30) return 'shadow-yellow-400/50';
    return 'shadow-red-400/50';
  };

  const getBgGradient = () => {
    if (percentage > 60) return 'from-emerald-500/20 to-green-500/20';
    if (percentage > 30) return 'from-yellow-500/20 to-amber-500/20';
    return 'from-red-500/20 to-pink-500/20';
  };

  return (
    <div className="absolute top-7 right-4 z-30">
      <motion.div 
        className={`bg-black/70 backdrop-blur-md rounded-xl px-3 py-2 flex items-center space-x-2 border border-purple-500/30 relative overflow-hidden ${getGlowColor()}`}
        style={{
          background: `linear-gradient(135deg, rgba(0, 0, 0, 0.8), ${getBgGradient().split(' ')[1].replace('/20', '/10')})`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(168, 85, 247, 0.2)'
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {/* 背景装饰光效 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse"></div>
        
        {/* 体力图标 */}
        <motion.div
          className="relative z-10"
          animate={percentage <= 10 ? { rotate: [0, -10, 10, 0] } : {}}
          transition={{ duration: 0.5, repeat: percentage <= 10 ? Infinity : 0 }}
        >
          <Zap className={`w-5 h-5 ${getStaminaColor()} drop-shadow-lg`} />
        </motion.div>
        
        {/* 体力数值 */}
        <div className="relative z-10 text-center">
          <div className={`text-sm font-bold ${getStaminaColor()} drop-shadow-sm`}
            style={{
              textShadow: '0 0 10px currentColor',
              filter: 'brightness(1.2)'
            }}
          >
            {current}/{max}
          </div>
        </div>

        {/* 购买按钮 - 紧凑版 */}
        {onShopClick && (
          <motion.button
            onClick={onShopClick}
            className="relative bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-1.5 text-white font-bold text-xs shadow-lg overflow-hidden group"
            style={{
              boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)'
            }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* 按钮背景动效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* 按钮内容 */}
            <div className="relative flex items-center">
              <Plus className="w-3 h-3" />
            </div>
            
            {/* 按钮光效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shimmer"></div>
          </motion.button>
        )}

        {/* 体力不足警告 */}
        {percentage <= 10 && (
          <motion.div
            className="absolute -inset-0.5 rounded-xl border border-red-500 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
}; 