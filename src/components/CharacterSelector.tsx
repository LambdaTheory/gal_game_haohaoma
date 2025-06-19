"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Star } from "lucide-react";
import Image from "next/image";

interface Character {
  id: string;
  name: string;
  image: string;
  isUnlocked: boolean;
  description: string;
}

interface CharacterSelectorProps {
  onCharacterSelect?: (characterId: string) => void;
}

const CHARACTERS: Character[] = [
  {
    id: "shenmuli",
    name: "神木李",
    image: "/character/shenmuli.png", // 使用默认头像，您可以稍后替换为具体的角色图片
    isUnlocked: true,
    description: "经典角色，永远的女神～",
  },
  {
    id: "zoe",
    name: "Zoe",
    image: "/character/zoe.png",
    isUnlocked: false,
    description: "神秘的魅惑女神，等待你的解锁...",
  },
  {
    id: "yumiko",
    name: "Yumiko",
    image: "/character/Yumiko.png",
    isUnlocked: false,
    description: "温柔的东方美人，即将登场...",
  },
  {
    id: "dina",
    name: "Dina",
    image: "/character/dina.png",
    isUnlocked: false,
    description: "热情的拉丁女郎，敬请期待...",
  },
];

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  onCharacterSelect,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const handleCharacterClick = (character: Character) => {
    if (!character.isUnlocked) {
      setSelectedCharacter(character.id);
      setShowModal(true);
    } else {
      // onCharacterSelect && onCharacterSelect(character.id);
      if (onCharacterSelect) {
        onCharacterSelect(character.id);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCharacter(null);
  };

  const selectedCharacterData = CHARACTERS.find(
    (c) => c.id === selectedCharacter
  );

  return (
    <>
      {/* 角色选择器 */}
      <div className="flex flex-col space-y-3">
        {CHARACTERS.map((character, index) => (
          <motion.div
            key={character.id}
            className="relative group cursor-pointer"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCharacterClick(character)}
          >
            {/* 角色头像容器 */}
            <div className="relative w-16 h-16 md:w-20 md:h-20">
              {/* 背景圆圈 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-gray-500 shadow-lg">
                {/* 内部光效 */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-500/20 to-transparent"></div>
              </div>

              {/* 角色图片 */}
              <div className="absolute inset-1 rounded-full overflow-hidden">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className={`object-cover transition-all duration-300 ${
                    character.isUnlocked
                      ? "grayscale-0 brightness-100"
                      : "grayscale-0 brightness-90 contrast-75 group-hover:brightness-100 group-hover:contrast-100"
                  }`}
                />

                {/* 未解锁状态 - 仅在底部添加轻微遮罩和锁图标，不遮挡脸部 */}
                {!character.isUnlocked && (
                  <>
                    {/* 底部遮罩条 */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>

                    {/* 锁图标位置调整到右下角 */}
                    <div className="absolute bottom-1 right-1 bg-black/80 rounded-full p-1">
                      <Lock className="w-3 h-3 md:w-4 md:h-4 text-gray-300" />
                    </div>
                  </>
                )}
              </div>

              {/* 悬停提示 */}
              <motion.div
                className="absolute -right-20 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
              >
                <div className="bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-purple-500/50">
                  <span className="text-purple-200 text-sm font-medium whitespace-nowrap">
                    {character.isUnlocked ? character.name : "🔒 待解锁"}
                  </span>
                </div>
              </motion.div>

              {/* 解锁状态指示 */}
              {character.isUnlocked && (
                <motion.div
                  className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-3 h-3 text-white fill-white" />
                </motion.div>
              )}

              {/* 脉冲效果 - 更明显的边框 */}
              {!character.isUnlocked && (
                <div className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-pulse"></div>
              )}

              {/* 额外的发光边框 */}
              <div className="absolute inset-0 rounded-full border border-purple-300/30 group-hover:border-pink-400/50 transition-colors duration-300"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 角色解锁弹窗 */}
      <AnimatePresence>
        {showModal && selectedCharacterData && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 max-w-sm w-full mx-4 relative border-2 border-purple-500/50 shadow-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(88, 28, 135, 0.3))",
                boxShadow:
                  "0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(147, 51, 234, 0.3)",
              }}
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: -20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 animate-pulse"></div>

              <div className="text-center relative z-10">
                {/* 角色大图 */}
                <motion.div
                  className="w-24 h-24 mx-auto mb-4 relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", duration: 0.8 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={selectedCharacterData.image}
                        alt={selectedCharacterData.name}
                        fill
                        className="object-cover grayscale"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 角色名称 */}
                <motion.h2
                  className="text-2xl font-bold text-white mb-2"
                  style={{ textShadow: "0 0 20px rgba(147, 51, 234, 0.8)" }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {selectedCharacterData.name}
                </motion.h2>

                {/* 描述文字 */}
                <motion.p
                  className="text-purple-200 mb-6 text-sm leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {selectedCharacterData.description}
                </motion.p>

                {/* 即将推出标题 */}
                <motion.div
                  className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 mb-6"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                    🚀 即将推出
                  </h3>
                  <p className="text-gray-300 text-sm">
                    这位美丽的角色正在紧急制作中，敬请期待后续更新！
                  </p>
                </motion.div>

                {/* 关闭按钮 */}
                <motion.button
                  onClick={closeModal}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-lg btn-glow w-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>✨</span>
                    <span>我知道了</span>
                    <span>✨</span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
