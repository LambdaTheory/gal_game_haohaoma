'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GAME_CONSTANTS } from '@/utils/gameConfig';

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

  // 根据角色和视频类型构建视频路径
  const videoSrc = `/videos/${character}/${videoType}.mp4`;
  
  // 调试信息
  console.log('VideoPlayer - 角色:', character, '视频类型:', videoType, '视频路径:', videoSrc, '全屏模式:', isFullscreen);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // 设置视频属性
      video.muted = GAME_CONSTANTS.VIDEO_MUTED;
      video.loop = GAME_CONSTANTS.VIDEO_LOOP;
      
      // 重新加载视频源
      video.load();
      
      // 等待视频加载完成后尝试播放
      const handleLoadedData = () => {
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
          className={`w-full h-full object-cover relative z-10 ${isFullscreen ? '' : 'rounded-lg'}`}
          muted={GAME_CONSTANTS.VIDEO_MUTED}
          loop={GAME_CONSTANTS.VIDEO_LOOP}
          playsInline
          preload="metadata"
        >
          <source src={videoSrc} type="video/mp4" />
          您的浏览器不支持视频播放。
        </video>

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
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-10, -50, -100],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
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
        {!isHiddenVideo && !isFullscreen && (
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

        {/* 视频遮罩层，用于优化点击体验 */}
        <div className="absolute inset-0 bg-transparent z-15" />
      </div>
    </motion.div>
  );
}; 