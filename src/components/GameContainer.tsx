'use client';

import React, { useMemo } from 'react';
import { GAME_CONSTANTS } from '@/utils/gameConfig';

interface GameContainerProps {
  children: React.ReactNode;
}

// 预定义星星位置和动画参数，避免客户端与服务端渲染不一致
const STAR_DATA = [
  { left: 10.4, top: 53.1, delay: 1.95, duration: 2.44 },
  { left: 25.1, top: 91.0, delay: 0.20, duration: 2.83 },
  { left: 37.3, top: 69.9, delay: 2.38, duration: 2.44 },
  { left: 21.9, top: 88.2, delay: 0.93, duration: 2.51 },
  { left: 94.7, top: 15.9, delay: 1.89, duration: 3.84 },
  { left: 57.3, top: 35.4, delay: 0.64, duration: 3.54 },
  { left: 45.7, top: 73.4, delay: 1.07, duration: 2.19 },
  { left: 26.2, top: 22.7, delay: 0.40, duration: 2.92 },
  { left: 67.0, top: 59.4, delay: 0.28, duration: 2.80 },
  { left: 34.5, top: 31.1, delay: 1.95, duration: 2.16 },
  { left: 64.0, top: 28.4, delay: 1.10, duration: 2.35 },
  { left: 10.7, top: 24.1, delay: 0.48, duration: 3.56 },
  { left: 24.0, top: 46.8, delay: 1.13, duration: 3.31 },
  { left: 92.3, top: 36.9, delay: 1.39, duration: 3.67 },
  { left: 98.0, top: 99.6, delay: 0.87, duration: 3.07 },
  { left: 63.1, top: 37.5, delay: 0.47, duration: 2.51 },
  { left: 40.6, top: 63.0, delay: 2.05, duration: 3.96 },
  { left: 10.4, top: 53.1, delay: 1.95, duration: 2.44 },
  { left: 90.3, top: 55.6, delay: 0.00, duration: 3.18 },
  { left: 98.6, top: 30.8, delay: 0.65, duration: 3.66 },
  { left: 79.9, top: 11.4, delay: 1.31, duration: 2.46 },
  { left: 64.3, top: 59.4, delay: 1.80, duration: 3.47 },
  { left: 37.1, top: 7.4, delay: 2.49, duration: 2.31 },
  { left: 92.7, top: 7.4, delay: 2.85, duration: 3.12 },
  { left: 94.2, top: 74.2, delay: 1.22, duration: 3.71 },
  { left: 95.6, top: 66.9, delay: 0.26, duration: 3.28 },
  { left: 70.9, top: 71.8, delay: 2.08, duration: 2.41 },
  { left: 53.4, top: 3.7, delay: 2.05, duration: 2.39 },
  { left: 5.1, top: 13.1, delay: 1.09, duration: 2.99 },
  { left: 5.9, top: 94.3, delay: 1.15, duration: 2.89 },
  { left: 40.0, top: 81.5, delay: 2.57, duration: 2.20 },
  { left: 35.5, top: 70.5, delay: 0.70, duration: 3.35 },
  { left: 95.6, top: 21.2, delay: 0.13, duration: 2.27 },
  { left: 33.5, top: 70.9, delay: 1.95, duration: 2.16 },
  { left: 63.0, top: 43.1, delay: 2.73, duration: 3.11 },
  { left: 69.4, top: 13.9, delay: 2.67, duration: 3.38 },
  { left: 12.4, top: 18.9, delay: 2.80, duration: 2.31 },
  { left: 42.9, top: 60.3, delay: 2.35, duration: 3.62 },
  { left: 7.0, top: 38.0, delay: 1.00, duration: 2.88 },
  { left: 12.6, top: 76.3, delay: 2.05, duration: 2.20 },
  { left: 7.1, top: 88.1, delay: 2.07, duration: 2.47 },
  { left: 5.6, top: 81.0, delay: 2.07, duration: 2.94 },
  { left: 76.8, top: 62.2, delay: 1.21, duration: 3.16 },
  { left: 66.4, top: 39.0, delay: 2.98, duration: 2.20 },
  { left: 37.2, top: 29.1, delay: 2.44, duration: 3.01 },
  { left: 87.4, top: 35.0, delay: 0.62, duration: 3.68 },
  { left: 53.8, top: 46.5, delay: 1.25, duration: 3.63 },
  { left: 88.6, top: 39.3, delay: 1.26, duration: 3.16 },
  { left: 80.0, top: 28.1, delay: 2.50, duration: 3.38 },
  { left: 44.2, top: 65.2, delay: 2.23, duration: 3.49 },
];

export const GameContainer: React.FC<GameContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* 动态渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900">
        {/* 动态光晕效果 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* 星空背景 */}
        <div className="absolute inset-0 opacity-30">
          {STAR_DATA.map((star, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* PC端显示：中央竖屏区域 */}
      <div className="hidden md:flex min-h-screen items-center justify-center p-4">
        <div 
          className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-pink-400/30 backdrop-blur-sm"
          style={{
            width: GAME_CONSTANTS.MOBILE_WIDTH,
            height: GAME_CONSTANTS.MOBILE_HEIGHT,
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))',
            boxShadow: '0 0 50px rgba(236, 72, 153, 0.3), inset 0 0 50px rgba(168, 85, 247, 0.1)'
          }}
        >
          {children}
        </div>
      </div>

      {/* 移动端显示：全屏铺满 */}
      <div className="md:hidden relative min-h-screen w-full">
        <div className="absolute inset-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}; 