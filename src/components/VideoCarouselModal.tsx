"use client";

import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Lock, Heart } from "lucide-react";
import { updateVideoUnlockStatus, VideoInfo } from "@/utils/videoConfig";
import { getCharacterDisplayName } from "@/utils/characterConfig";

interface VideoCarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: string;
  progress: number;
  onPlayVideo?: (videoId: string) => void;
}

export const VideoCarouselModal: React.FC<VideoCarouselModalProps> = ({
  isOpen,
  onClose,
  character,
  progress,
  onPlayVideo,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 获取角色的视频列表，并根据当前进度更新解锁状态
  const videos = updateVideoUnlockStatus(character, progress);
  const characterDisplayName = getCharacterDisplayName(character);

  const unlockedCount = videos.filter((video) => video.isUnlocked).length;
  const totalCount = videos.length;

  // 切换到上一个视频
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // 切换到下一个视频
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  // 播放视频
  const handlePlayVideo = (video: VideoInfo) => {
    if (video.isUnlocked && onPlayVideo) {
      onPlayVideo(video.id); // 调用播放函数，会切换到全屏播放模式
      onClose(); // 关闭弹窗
    }
  };

  // 获取视频路径
  const getVideoPath = (videoId: string) => {
    return `/videos/${character}/${videoId}.mp4`;
  };

  // 处理拖拽开始
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
    setDragOffset(0);
  };

  // 处理拖拽移动
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - dragStart;
    setDragOffset(offset);
  };

  // 处理拖拽结束
  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // 如果拖拽距离超过阈值，则切换视频
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // 向右拖拽，显示上一个
        handlePrevious();
      } else {
        // 向左拖拽，显示下一个
        handleNext();
      }
    }

    setDragOffset(0);
  };

  // 鼠标事件
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // 触摸事件
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  if (typeof window === "undefined") return null;

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
            className="relative w-[90%] max-w-sm mx-auto bg-gradient-to-b from-purple-900/95 via-pink-900/95 to-purple-900/95 rounded-2xl shadow-2xl border border-pink-400/30 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* 发光边框效果 */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 opacity-20 animate-gradient-shift rounded-2xl"
              style={{ backgroundSize: "200% 200%" }}
            />

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
                style={{ textShadow: "0 0 20px rgba(244, 114, 182, 0.8)" }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Heart className="w-6 h-6 inline mr-2 fill-pink-400 text-pink-400" />
                {characterDisplayName} 的福利视频
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

            {/* 视频轮播区域 */}
            <div className="relative px-6 pb-4">
              <div className="flex justify-center mb-4">
                <div
                  ref={containerRef}
                  className="relative aspect-[9/16] bg-black/50 rounded-xl overflow-hidden max-h-80 cursor-grab active:cursor-grabbing w-64"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{ userSelect: "none" }}
                >
                  {/* 当前视频 */}
                  {videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="absolute inset-0"
                      initial={false}
                      animate={{
                        x: `${
                          (index - currentIndex) * 100 +
                          (isDragging
                            ? (dragOffset / (containerRef.current?.offsetWidth || 300)) * 100
                            : 0)
                        }%`,
                        opacity: index === currentIndex ? 1 : 0.3,
                      }}
                      transition={{
                        duration: isDragging ? 0 : 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      {/* 视频预览 */}
                      <div className="relative w-full h-full">
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          className="absolute inset-0 w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          onLoadedMetadata={() => {
                            // 自动播放预览（静音）
                            const video = videoRefs.current[index];
                            if (video && index === currentIndex) {
                              video.currentTime = 5; // 从第5秒开始预览
                              video.play().catch(() => {});
                            }
                          }}
                        >
                          <source src={getVideoPath(video.id)} type="video/mp4" />
                        </video>

                        {/* 未解锁遮罩层 */}
                        {!video.isUnlocked && (
                          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center">
                            {/* 模糊背景 */}
                            <div
                              className="absolute inset-0 bg-black/40"
                              style={{
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                              }}
                            />

                            {/* 锁图标 */}
                            <motion.div
                              className="relative z-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-4 mb-4"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Lock className="w-8 h-8 text-white" />
                            </motion.div>

                            {/* 解锁提示 */}
                            <div className="relative z-10 text-center">
                              <h3 className="text-white font-bold text-lg mb-1">
                                {video.name}
                              </h3>
                              <p className="text-pink-200 text-sm">
                                {video.unlockCondition}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* 已解锁播放按钮 */}
                        {video.isUnlocked && index === currentIndex && (
                          <motion.button
                            onClick={() => handlePlayVideo(video)}
                            className="absolute inset-0 bg-black/30 flex items-center justify-center group hover:bg-black/50 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <motion.div
                              className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-4 group-hover:shadow-2xl transition-shadow"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Play className="w-8 h-8 text-white fill-white ml-1" />
                            </motion.div>
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 视频信息 */}
              <div className="text-center mb-4">
                <h3
                  className={`font-bold text-lg mb-2 ${
                    videos[currentIndex]?.isUnlocked
                      ? "text-white"
                      : "text-gray-300"
                  }`}
                >
                  {videos[currentIndex]?.name}
                </h3>
                <div className="flex items-center justify-center space-x-4">
                  {/* 解锁状态 */}
                  {videos[currentIndex]?.isUnlocked ? (
                    <div className="text-green-400 text-sm font-medium bg-green-400/20 px-3 py-1 rounded-full">
                      ✅ 已解锁
                    </div>
                  ) : (
                    <div className="text-orange-400 text-sm font-medium bg-orange-400/20 px-3 py-1 rounded-full">
                      🔒 {videos[currentIndex]?.unlockCondition}
                    </div>
                  )}
                </div>
              </div>

              {/* 指示器 */}
              {videos.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? "bg-pink-400" : "bg-gray-500"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 底部提示 */}
            <motion.div
              className="relative px-4 pb-4 text-center"
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
