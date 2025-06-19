'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';
import { HeartEffect } from '@/types/game';

interface HeartEffectsProps {
  effects: HeartEffect[];
}

export const HeartEffects: React.FC<HeartEffectsProps> = ({ effects }) => {
  // 随机选择爱心图标类型和颜色
  const getRandomHeartConfig = () => {
    const icons = [Heart, Star, Sparkles];
    const colors = [
      'text-pink-400 fill-pink-400',
      'text-rose-400 fill-rose-400', 
      'text-purple-400 fill-purple-400',
      'text-fuchsia-400 fill-fuchsia-400',
      'text-red-400 fill-red-400'
    ];
    const glows = [
      'drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]',
      'drop-shadow-[0_0_15px_rgba(251,113,133,0.8)]',
      'drop-shadow-[0_0_15px_rgba(196,181,253,0.8)]',
      'drop-shadow-[0_0_15px_rgba(232,121,249,0.8)]',
      'drop-shadow-[0_0_15px_rgba(248,113,113,0.8)]'
    ];
    
    const randomIndex = Math.floor(Math.random() * icons.length);
    const colorIndex = Math.floor(Math.random() * colors.length);
    
    return {
      Icon: icons[randomIndex],
      color: colors[colorIndex],
      glow: glows[colorIndex]
    };
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-15">
      <AnimatePresence>
        {effects.map((effect) => {
          const { Icon, color, glow } = getRandomHeartConfig();
          
          return (
            <motion.div
              key={effect.id}
              className="absolute"
              style={{
                left: effect.x - 15,
                top: effect.y - 15,
              }}
              initial={{ 
                opacity: 1, 
                scale: 0.3,
                y: 0,
                rotate: 0,
              }}
              animate={{ 
                opacity: [1, 1, 0], 
                scale: [0.3, 1.5, 0.8],
                y: [-10, -80, -120],
                rotate: [0, 15, -10, 0],
                x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
              }}
              exit={{ 
                opacity: 0,
                scale: 0.2,
                y: -150,
              }}
              transition={{ 
                duration: 2,
                ease: "easeOut",
                times: [0, 0.6, 1]
              }}
            >
              {/* 主要爱心图标 */}
              <Icon 
                className={`w-8 h-8 ${color} ${glow} relative z-10`} 
              />
              
              {/* 光晕背景 */}
              <div 
                className="absolute inset-0 w-8 h-8 rounded-full opacity-60 animate-pulse"
                style={{
                  background: `radial-gradient(circle, ${color.includes('pink') ? 'rgba(244,114,182,0.4)' : 
                    color.includes('rose') ? 'rgba(251,113,133,0.4)' :
                    color.includes('purple') ? 'rgba(196,181,253,0.4)' :
                    color.includes('fuchsia') ? 'rgba(232,121,249,0.4)' :
                    'rgba(248,113,113,0.4)'} 0%, transparent 70%)`,
                  filter: 'blur(8px)'
                }}
              />
              
              {/* 额外的闪烁效果 */}
              <motion.div
                className="absolute inset-0 w-8 h-8"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-full h-full text-yellow-300 fill-yellow-300 opacity-80" />
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* 背景粒子效果 */}
      {effects.length > 0 && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-5, -25],
                opacity: [0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: Math.random() * 0.5,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}; 