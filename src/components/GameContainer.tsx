'use client';

import React from 'react';
import { GAME_CONSTANTS } from '@/utils/gameConfig';

interface GameContainerProps {
  children: React.ReactNode;
}

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
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
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