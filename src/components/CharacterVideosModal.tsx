"use client";

import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Lock, Heart } from "lucide-react";
import { 
  getCharacterVideos, 
  updateVideoUnlockStatus,
  VideoInfo 
} from "@/utils/videoConfig";
import { getCharacterDisplayName } from "@/utils/characterConfig";

interface CharacterVideosModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: string;
  progress: number; // 当前亲密度进度
  onPlayVideo?: (videoId: string) => void; // 播放视频回调
}

export const CharacterVideosModal: React.FC<CharacterVideosModalProps> = ({
  isOpen,
  onClose,
  character,
  progress,
  onPlayVideo,
}) => {
  // 获取角色的视频列表，并根据当前进度更新解锁状态
  const videos = updateVideoUnlockStatus(character, progress);
  const characterDisplayName = getCharacterDisplayName(character);
  
  const unlockedCount = videos.filter(video => video.isUnlocked).length;
  const totalCount = videos.length;

  const handlePlayVideo = (video: VideoInfo) => {
    if (video.isUnlocked && onPlayVideo) {
      onPlayVideo(video.id);
      onClose();
    }
  };

  // 使用 Portal 确保弹窗渲染到 body 中
  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 背景遮罩 */}
          <motion.div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 弹窗内容 */}
          <motion.div
            className="relative w-[90%] max-w-md bg-gradient-to-b from-purple-900/95 via-pink-900/95 to-purple-900/95 rounded-2xl shadow-2xl border border-pink-400/30 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* 发光边框效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 opacity-20 animate-gradient-shift rounded-2xl" 
                 style={{ backgroundSize: '200% 200%' }} />
            
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[10000] w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* 标题区域 */}
            <div className="relative p-6 pb-4">
              <motion.h2 
                className="text-2xl font-bold text-white text-center mb-2"
                style={{ textShadow: '0 0 20px rgba(244, 114, 182, 0.8)' }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Heart className="w-6 h-6 inline mr-2 fill-pink-400 text-pink-400" />
                {characterDisplayName} 的视频收藏
              </motion.h2>
              
              <motion.div 
                className="text-center text-pink-200 text-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                已解锁 {unlockedCount}/{totalCount} 个视频
              </motion.div>
            </div>

            {/* 视频列表 */}
            <div className="relative px-6 pb-6 max-h-80 overflow-y-auto">
              <div className="space-y-3">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    className={`
                      relative p-4 rounded-xl border transition-all duration-300
                      ${video.isUnlocked 
                        ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-400/50 hover:border-pink-400/80 cursor-pointer' 
                        : 'bg-gray-800/50 border-gray-600/50 cursor-not-allowed'
                      }
                    `}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    onClick={() => handlePlayVideo(video)}
                    whileHover={video.isUnlocked ? { scale: 1.02 } : {}}
                    whileTap={video.isUnlocked ? { scale: 0.98 } : {}}
                  >
                    {/* 视频信息 */}
                    <div className="flex items-center space-x-3">
                      {/* 播放/锁定图标 */}
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        ${video.isUnlocked 
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-pink-500/30' 
                          : 'bg-gray-700'
                        }
                      `}>
                        {video.isUnlocked ? (
                          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>

                      {/* 视频详情 */}
                      <div className="flex-1">
                        <h3 className={`font-medium ${video.isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                          {video.name}
                        </h3>
                        <p className={`text-sm ${video.isUnlocked ? 'text-pink-200' : 'text-gray-500'}`}>
                          {video.unlockCondition}
                        </p>
                      </div>

                      {/* 解锁状态指示 */}
                      {video.isUnlocked ? (
                        <div className="text-green-400 text-xs font-medium bg-green-400/20 px-2 py-1 rounded-full">
                          已解锁
                        </div>
                      ) : (
                        <div className="text-orange-400 text-xs font-medium bg-orange-400/20 px-2 py-1 rounded-full">
                          待解锁
                        </div>
                      )}
                    </div>

                    {/* 悬停效果 */}
                    {video.isUnlocked && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-xl opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))',
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 底部提示 */}
            <motion.div 
              className="relative px-6 pb-6 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-xs text-purple-300 bg-purple-900/30 px-4 py-2 rounded-full border border-purple-500/30">
                💕 提升亲密度解锁更多精彩内容 💕
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}; 