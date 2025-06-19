'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart, Zap, Play, Sparkles } from 'lucide-react';
import { SHOP_ITEMS } from '@/utils/gameConfig';

type ModalType = 'none' | 'insufficient-stamina' | 'shop' | 'victory' | 'developing';

interface GameModalProps {
  type: ModalType;
  onClose: () => void;
  onBuyItem?: (itemId: string) => void;
  onPlayHiddenVideo?: () => void;
  onOpenShop?: () => void;
}

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 50
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    y: -20
  }
};

// 定义固定的心形和星星位置数据
const VICTORY_PARTICLES_DATA = [
  { left: 15, top: 10, delay: 0.2, xOffset: 15 },
  { left: 25, top: 30, delay: 0.8, xOffset: -10 },
  { left: 75, top: 15, delay: 0.4, xOffset: -20 },
  { left: 85, top: 45, delay: 1.0, xOffset: 25 },
  { left: 50, top: 60, delay: 0.6, xOffset: -15 },
  { left: 30, top: 75, delay: 1.2, xOffset: 20 },
  { left: 70, top: 85, delay: 0.3, xOffset: -25 },
  { left: 40, top: 20, delay: 0.9, xOffset: 10 },
  { left: 60, top: 35, delay: 1.4, xOffset: 5 },
  { left: 20, top: 50, delay: 0.7, xOffset: -5 }
];

export const GameModal: React.FC<GameModalProps> = ({ 
  type, 
  onClose, 
  onBuyItem, 
  onPlayHiddenVideo,
  onOpenShop
}) => {
  if (type === 'none') return null;

  const renderModalContent = () => {
    switch (type) {
      case 'insufficient-stamina':
        return (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Zap className="w-20 h-20 text-red-400 mx-auto mb-4 drop-shadow-2xl animate-pulse" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-white mb-4" 
                style={{ textShadow: '0 0 20px rgba(248, 113, 113, 0.8)' }}>
              体力不足！
            </h2>
            
            <p className="text-pink-200 mb-6">
              需要更多体力才能继续与她互动~
            </p>
            
            <div className="space-y-3">
              <motion.button
                onClick={() => {
                  onClose();
                  // 延迟一点再打开商城，让关闭动画完成
                  setTimeout(() => {
                    if (onOpenShop) {
                      onOpenShop();
                    }
                  }, 300);
                }}
                className="w-full px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold shadow-lg btn-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>前往商城</span>
                  <span>💎</span>
                </span>
              </motion.button>
              
              <motion.button
                onClick={onClose}
                className="w-full px-8 py-2 bg-gray-600/80 text-gray-300 rounded-full font-medium border border-gray-500/50"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(75, 85, 99, 0.9)' }}
                whileTap={{ scale: 0.98 }}
              >
                稍后再说
              </motion.button>
            </div>
          </div>
        );

      case 'shop':
        return (
          <div className="text-center">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <ShoppingCart className="w-20 h-20 text-purple-400 mx-auto mb-4 drop-shadow-2xl animate-pulse" />
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold text-white mb-6 neon-text-purple"
              style={{ textShadow: '0 0 25px rgba(168, 85, 247, 0.9)' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💝 魅惑商城 💝
            </motion.h2>
            
            <p className="text-pink-300 mb-6 text-sm italic">
              &quot;选择你的道具，让她更加迷恋你~&quot;
            </p>
            
            <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
              {SHOP_ITEMS.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className="bg-gradient-to-r from-gray-700/60 to-gray-800/60 backdrop-blur-sm rounded-xl p-3 flex items-start justify-between border border-purple-500/30 hover:border-pink-500/50 transition-all group relative overflow-hidden min-w-0"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.01,
                    boxShadow: '0 8px 32px rgba(236, 72, 153, 0.2)'
                  }}
                >
                  {/* 商品背景光效 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="text-left relative z-10 flex-1 min-w-0 mr-3">
                    <h3 className="text-white font-bold flex items-center space-x-1 mb-1 text-sm">
                      <span className="text-base">{item.name.split(' ')[0]}</span>
                      <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-extrabold truncate">
                        {item.name.substring(item.name.indexOf(' ') + 1)}
                      </span>
                    </h3>
                    <p className="text-pink-200 text-xs leading-relaxed mb-2 break-words">{item.description}</p>
                    
                    {/* 商品效果提示 */}
                    <div className="flex flex-wrap items-center gap-1">
                      {item.type === 'stamina' && (
                        <div className="flex items-center space-x-1 text-emerald-400 text-xs bg-emerald-900/20 px-2 py-0.5 rounded-full">
                          <Zap className="w-3 h-3 flex-shrink-0" />
                          <span className="whitespace-nowrap">+{item.effect.stamina} 体力</span>
                        </div>
                      )}
                      {item.type === 'progress' && (
                        <div className="flex items-center space-x-1 text-pink-400 text-xs bg-pink-900/20 px-2 py-0.5 rounded-full">
                          <Heart className="w-3 h-3 flex-shrink-0" />
                          <span className="whitespace-nowrap">+{item.effect.progress}% 亲密度</span>
                        </div>
                      )}
                      {item.type === 'other' && (
                        <div className="flex items-center space-x-1 text-purple-400 text-xs bg-purple-900/20 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3 flex-shrink-0" />
                          <span className="whitespace-nowrap">特殊效果</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => onBuyItem && onBuyItem(item.id)}
                    className="px-3 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white rounded-full font-bold text-sm shadow-lg relative overflow-hidden transition-all flex-shrink-0"
                    style={{
                      background: 'linear-gradient(45deg, #ec4899, #a855f7, #ec4899)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient-shift 3s ease infinite'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 15px rgba(236, 72, 153, 0.6)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center space-x-1 whitespace-nowrap">
                      <span>💎</span>
                      <span>{item.price}</span>
                    </span>
                    
                    {/* 按钮光效 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                  </motion.button>
                </motion.div>
              ))}
            </div>
            
            {/* 底部装饰 */}
            <motion.div 
              className="mt-6 text-xs text-pink-300/70 italic"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨ 每一次购买都让你们的关系更进一步 ✨
            </motion.div>
          </div>
        );

      case 'victory':
        return (
          <div className="text-center relative">
            {/* 飘落的心形和星星 */}
            <div className="absolute inset-0 pointer-events-none">
              {VICTORY_PARTICLES_DATA.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                  }}
                  animate={{
                    y: [-20, 100],
                    opacity: [0, 1, 0],
                    rotate: [0, 360],
                    x: [0, particle.xOffset]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "linear"
                  }}
                >
                  {i % 2 === 0 ? 
                    <Heart className="w-4 h-4 text-pink-400 fill-pink-400" /> :
                    <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  }
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", duration: 0.8 }}
            >
              <Heart className="w-24 h-24 text-pink-400 fill-pink-400 mx-auto mb-4 drop-shadow-2xl animate-pulse" />
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-bold text-white mb-4"
              style={{ textShadow: '0 0 20px rgba(244, 114, 182, 0.8)' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              🎉 恭喜通关！🎉
            </motion.h2>
            
            <motion.p 
              className="text-pink-200 mb-8 text-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              你成功解锁了特殊内容~
            </motion.p>
            
            <motion.button
              onClick={onPlayHiddenVideo}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full font-bold text-lg shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <Play className="w-6 h-6" />
                <span>观看特殊视频</span>
                <Heart className="w-6 h-6 fill-current animate-pulse" />
              </span>
            </motion.button>
          </div>
        );

      case 'developing':
        return (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <div className="w-20 h-20 mx-auto mb-4 relative">
                {/* 齿轮图标 */}
                <motion.div
                  className="w-full h-full text-yellow-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.65-.07-.97l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.32-.07.65-.07.97c0 .33.03.65.07.97L2.46 14.6c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.31.61.22l2.49-1c.52.39 1.06.73 1.69.98l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.25 1.17-.59 1.69-.98l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.63Z"/>
                  </svg>
                </motion.div>
                
                {/* 小火花特效 */}
                <motion.div
                  className="absolute -top-1 -right-1 text-orange-400"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-2xl font-bold text-white mb-4"
              style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.8)' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              🚧 功能开发中 🚧
            </motion.h2>
            
            <motion.p 
              className="text-yellow-200 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              这个功能正在紧急开发中，敬请期待！
            </motion.p>
            
            <motion.p 
              className="text-orange-300 text-sm mb-8 italic"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              &quot;工程师小哥哥正在加班加点为你打造~&quot;
            </motion.p>
            
            <motion.button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-bold shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>好的，我知道了</span>
                <span>👌</span>
              </span>
            </motion.button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9998] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 max-w-md w-full mx-4 relative border-2 border-pink-500/50 shadow-2xl max-h-[90vh] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(88, 28, 135, 0.3))',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(236, 72, 153, 0.3)'
          }}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            type: "spring",
            duration: 0.6,
            bounce: 0.3
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 关闭按钮 */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20 p-2 rounded-full hover:bg-white/10"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* 弹窗内容 */}
          {renderModalContent()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 