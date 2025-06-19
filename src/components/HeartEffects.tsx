'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';
import { HeartEffect } from '@/types/game';

interface HeartEffectsProps {
  effects: HeartEffect[];
}

// 预定义背景粒子位置和动画延迟
const BACKGROUND_PARTICLES = [
  { left: 15, top: 25, delay: 0.1 },
  { left: 35, top: 45, delay: 0.2 },
  { left: 75, top: 15, delay: 0.3 },
  { left: 80, top: 55, delay: 0.15 },
  { left: 55, top: 70, delay: 0.25 },
  { left: 20, top: 85, delay: 0.4 },
  { left: 90, top: 80, delay: 0.1 },
  { left: 40, top: 30, delay: 0.35 },
  { left: 65, top: 10, delay: 0.45 },
  { left: 10, top: 60, delay: 0.2 }
];

// 预定义效果的横向偏移量，使每个效果有固定的随机横向移动
const X_OFFSETS = [
  [5, 15], [-10, -25], [15, 30], [-5, -15], [10, 20], 
  [-15, -5], [20, 10], [-20, -10], [5, 25], [-10, -30]
];

export const HeartEffects: React.FC<HeartEffectsProps> = ({ effects }) => {
  // 预先计算图标配置，不要每次渲染都重新随机选择
  const iconConfigs = useMemo(() => {
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
    
    // 创建30个固定配置，这样应该足够所有效果使用
    return Array(30).fill(0).map((_, i) => {
      const iconIndex = i % icons.length;
      const colorIndex = (i * 2) % colors.length;
      
      return {
        Icon: icons[iconIndex],
        color: colors[colorIndex],
        glow: glows[colorIndex],
        xOffset1: X_OFFSETS[i % 10][0],
        xOffset2: X_OFFSETS[i % 10][1]
      };
    });
  }, []);

  // 根据效果ID获取配置
  const getEffectConfig = (effectId: string) => {
    // 使用字符串的hashCode来获取一个稳定的数值
    const hashCode = effectId.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    const index = Math.abs(hashCode) % iconConfigs.length;
    return iconConfigs[index];
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-15">
      <AnimatePresence>
        {effects.map((effect) => {
          const config = getEffectConfig(effect.id);
          const { Icon, color, glow, xOffset1, xOffset2 } = config;
          
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
                x: [0, xOffset1, xOffset2],
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
          {BACKGROUND_PARTICLES.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-400 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-5, -25],
                opacity: [0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}; 