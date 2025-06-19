"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import {
  getCharacterDisplayName,
  getCharacterAvatarPath,
} from "@/utils/characterConfig";
import { VideoCarouselModal } from "./VideoCarouselModal";

interface CharacterInfoProps {
  progress: number; // 0-100
  character?: string; // 当前角色名称
  avatarSrc?: string; // 可选的自定义头像路径
  onPlayVideo?: (videoId: string) => void; // 播放视频的回调函数
}

export const CharacterInfo: React.FC<CharacterInfoProps> = ({
  progress,
  character = "shenmuli", // 默认角色
  avatarSrc,
  onPlayVideo,
}) => {
  // 视频弹窗状态
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  // 根据角色名称生成头像路径
  const characterAvatarSrc = avatarSrc || getCharacterAvatarPath(character);
  const characterDisplayName = getCharacterDisplayName(character);

  // 处理头像点击
  const handleAvatarClick = () => {
    setIsVideoModalOpen(true);
  };

  // 关闭视频弹窗
  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };
  return (
    <div className="absolute top-4 left-4 z-10 flex items-center space-x-3">
      {/* 角色头像 - 性感发光边框，添加点击功能 */}
      <div className="relative cursor-pointer" onClick={handleAvatarClick}>
        <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-pink-400 bg-gray-700 relative transition-transform duration-200 hover:scale-105">
          {/* 发光边框效果 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 animate-spin-slow opacity-75 blur-sm"></div>
          <div className="absolute inset-1 rounded-full overflow-hidden bg-gray-800">
            <img
              src={characterAvatarSrc}
              alt={`${character}角色头像`}
              className="w-full h-full object-cover filter brightness-110 contrast-110"
              onError={(e) => {
                // 如果图片加载失败，显示默认的心形图标
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) {
                  fallback.style.display = "flex";
                }
              }}
            />
            {/* 备用显示（当图片加载失败时） */}
            <div
              className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600"
              style={{ display: "none" }}
            >
              <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* 角色状态指示器 */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-lg shadow-green-400/50">
          <Sparkles className="w-2 h-2 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* 进度条容器 - 性感样式 */}
      <div className="flex flex-col justify-end space-y-2">
        <div className="flex items-center space-x-2">
          {/* 角色名称显示 */}
          <div className="text-xs text-purple-300 font-medium">
            <span style={{ textShadow: "0 0 8px rgba(168, 85, 247, 0.6)" }}>
              {characterDisplayName}
            </span>
          </div>
          {/* 标题 */}
          <div className="text-xs text-pink-300 font-semibold flex items-center space-x-1">
            <Heart className="w-3 h-3 fill-pink-300" />
            <span>亲密度</span>
          </div>
        </div>

        {/* 进度条背景 - 霓虹效果 */}
        <div className="w-32 md:w-36 max-w-full h-4 bg-gray-800/80 rounded-full overflow-hidden relative border border-pink-500/30 shadow-inner">
          {/* 背景光晕 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent animate-pulse"></div>

          {/* 进度条填充 - 动态渐变 */}
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #ec4899, #a855f7, #ec4899)",
              backgroundSize: "200% 100%",
              boxShadow:
                "0 0 20px rgba(236, 72, 153, 0.6), 0 0 40px rgba(168, 85, 247, 0.4)",
            }}
            initial={{ width: 0 }}
            animate={{
              width: `${Math.max(0, Math.min(100, progress))}%`,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              width: { duration: 0.5, ease: "easeOut" },
              backgroundPosition: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* 流动光效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-flow"></div>
          </motion.div>

          {/* 进度文字 - 放在进度条内部 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-xs font-bold text-white drop-shadow-lg"
              style={{
                textShadow: "0 0 8px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.8)",
                filter: "brightness(1.2)",
              }}
            >
              {Math.round(progress)}%
            </span>
            {progress >= 100 && (
              <motion.span
                className="ml-1 text-yellow-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                💕
              </motion.span>
            )}
          </div>
        </div>
      </div>

      {/* 视频弹窗 - 使用Portal渲染到body */}
      <VideoCarouselModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideoModal}
        character={character}
        progress={progress}
        onPlayVideo={onPlayVideo}
      />
    </div>
  );
};
