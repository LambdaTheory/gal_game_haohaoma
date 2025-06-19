'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GAME_CONSTANTS } from '@/utils/gameConfig';

// 预定义庆祝粒子的位置和动画参数
const CELEBRATION_PARTICLES = [
  { left: 10, top: 15, delay: 0.3, duration: 3.1 },
  { left: 20, top: 35, delay: 1.2, duration: 2.9 },
  { left: 30, top: 75, delay: 0.5, duration: 3.2 },
  { left: 40, top: 45, delay: 1.8, duration: 2.8 },
  { left: 50, top: 85, delay: 0.7, duration: 3.4 },
  { left: 60, top: 25, delay: 1.5, duration: 3.0 },
  { left: 70, top: 65, delay: 0.9, duration: 2.7 },
  { left: 80, top: 5, delay: 1.1, duration: 3.3 },
  { left: 90, top: 55, delay: 0.2, duration: 3.5 },
  { left: 15, top: 95, delay: 1.4, duration: 2.6 },
  { left: 25, top: 5, delay: 0.6, duration: 3.1 },
  { left: 35, top: 45, delay: 1.7, duration: 2.8 },
  { left: 45, top: 85, delay: 0.4, duration: 3.3 },
  { left: 55, top: 10, delay: 1.9, duration: 3.0 },
  { left: 65, top: 50, delay: 0.8, duration: 2.7 },
  { left: 75, top: 90, delay: 1.0, duration: 3.4 },
  { left: 85, top: 30, delay: 0.1, duration: 3.2 },
  { left: 95, top: 70, delay: 1.3, duration: 2.9 },
  { left: 5, top: 60, delay: 1.6, duration: 3.5 },
  { left: 60, top: 20, delay: 0.9, duration: 2.8 }
];

interface VideoPlayerProps {
  character?: string; // 角色名称，默认为shenmuli
  videoType?: string; // 视频类型，支持任意视频文件名
  onClick: (x: number, y: number) => void;
  isHiddenVideo?: boolean;
  isFullscreen?: boolean; // 是否为全屏播放模式
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  character = 'shenmuli', // 默认角色
  videoType = 'demo-video', // 默认视频类型
  onClick,
  isHiddenVideo = false,
  isFullscreen = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [clickEffect, setClickEffect] = useState<{ x: number; y: number; id: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 根据角色和视频类型构建视频路径
  const videoSrc = `/videos/${character}/${videoType}.mp4`;
  
  // 调试信息
  console.log('VideoPlayer - 角色:', character, '视频类型:', videoType, '视频路径:', videoSrc, '全屏模式:', isFullscreen);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // 重置加载状态
      setIsLoading(true);
      
      // 设置视频属性
      video.muted = GAME_CONSTANTS.VIDEO_MUTED;
      video.loop = GAME_CONSTANTS.VIDEO_LOOP;
      
      // 重新加载视频源
      video.load();
      
      // 等待视频加载完成后尝试播放
      const handleLoadedData = () => {
        setIsLoading(false);
        video.play().catch(err => {
          console.log('自动播放失败:', err);
        });
      };

      video.addEventListener('loadeddata', handleLoadedData);
      
      // 清理事件监听器
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [videoSrc]); // 监听videoSrc变化

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 防止隐藏视频和全屏播放时被点击
    if (isHiddenVideo || isFullscreen) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 创建点击波纹效果
    setClickEffect({ x, y, id: Date.now() });
    setTimeout(() => setClickEffect(null), 1000);
    
    onClick(x, y);
  };

  return (
    <motion.div
      className={`relative w-full h-full overflow-hidden ${isFullscreen ? '' : 'cursor-pointer'}`}
      onClick={handleClick}
      onHoverStart={() => !isFullscreen && setIsHovered(true)}
      onHoverEnd={() => !isFullscreen && setIsHovered(false)}
      whileTap={isFullscreen ? {} : { scale: 0.995 }}
      transition={{ duration: 0.1 }}
    >
      {/* 视频容器 */}
      <div className="relative w-full h-full">
        {/* 性感边框效果 - 全屏模式下不显示 */}
        {!isFullscreen && (
          <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
            isHiddenVideo 
              ? 'border-4 border-yellow-400 shadow-2xl shadow-yellow-400/50' 
              : isHovered 
                ? 'border-4 border-pink-400 shadow-2xl shadow-pink-400/50' 
                : 'border-2 border-pink-400/30 shadow-lg shadow-pink-400/20'
          }`}>
            {/* 流动边框动画 */}
            {(isHovered || isHiddenVideo) && (
              <div className="absolute inset-0 rounded-lg">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 opacity-30 animate-gradient-shift" 
                     style={{ backgroundSize: '200% 200%' }} />
              </div>
            )}
          </div>
        )}

        {/* 视频元素 */}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover relative z-10 ${isFullscreen ? '' : 'rounded-lg'} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          muted={GAME_CONSTANTS.VIDEO_MUTED}
          loop={GAME_CONSTANTS.VIDEO_LOOP}
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
          您的浏览器不支持视频播放。
        </video>

        {/* 加载动画 */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-black/40 backdrop-blur-sm rounded-lg">
            <div className="w-16 h-16 mb-4">
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 right-0 bottom-0">
                  <div className="w-full h-full border-4 border-t-pink-400 border-r-pink-400/40 border-b-pink-400/20 border-l-pink-400/80 rounded-full animate-spin"></div>
                </div>
                <div className="absolute top-2 left-2 right-2 bottom-2">
                  <div className="w-full h-full border-4 border-t-purple-500 border-r-purple-500/20 border-b-purple-500/60 border-l-purple-500/10 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
                </div>
              </div>
            </div>
            <div className="text-white text-sm font-medium px-3 py-1 bg-black/60 rounded-full border border-pink-400/30">
              加载中...
            </div>
          </div>
        )}

        {/* 悬停叠加层 - 全屏模式下不显示 */}
        {isHovered && !isHiddenVideo && !isFullscreen && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-pink-500/20 via-transparent to-purple-500/20 rounded-lg pointer-events-none z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* 隐藏视频特殊效果 - 全屏模式下不显示 */}
        {isHiddenVideo && !isFullscreen && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* 金色光晕 */}
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/30 via-transparent to-yellow-400/30 rounded-lg animate-pulse" />
            
            {/* 庆祝粒子 */}
            {CELEBRATION_PARTICLES.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [-10, -50, -100],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}

        {/* 点击波纹效果 - 全屏模式下不显示 */}
        {clickEffect && !isFullscreen && (
          <motion.div
            className="absolute rounded-full border-4 border-pink-400 pointer-events-none z-30"
            style={{
              left: clickEffect.x - 25,
              top: clickEffect.y - 25,
              width: 50,
              height: 50,
            }}
            initial={{ 
              scale: 0,
              opacity: 1,
              borderWidth: 4
            }}
            animate={{ 
              scale: 3,
              opacity: 0,
              borderWidth: 0
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          />
        )}

        {/* 交互提示（仅在普通视频且非全屏时显示） */}
        {!isHiddenVideo && !isFullscreen && !isLoading && (
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-pink-400/30 pointer-events-none z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.3 }}
            style={{
              textShadow: '0 0 10px rgba(236, 72, 153, 0.8)'
            }}
          >
            💕 点击与她互动 💕
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}; 