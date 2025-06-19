'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Sparkles } from 'lucide-react';

interface ShopButtonProps {
  onClick: () => void;
}

export const ShopButton: React.FC<ShopButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-full shadow-2xl border-2 border-pink-500/50 relative overflow-hidden group"
      style={{
        background: 'linear-gradient(45deg, #9333ea, #ec4899, #a855f7)',
        backgroundSize: '200% 200%',
        boxShadow: '0 8px 32px rgba(236, 72, 153, 0.4), 0 0 20px rgba(168, 85, 247, 0.3)'
      }}
      whileHover={{ 
        scale: 1.05,
        rotate: [0, -5, 5, 0],
        boxShadow: '0 12px 40px rgba(236, 72, 153, 0.6), 0 0 30px rgba(168, 85, 247, 0.5)'
      }}
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        backgroundPosition: {
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        },
        scale: { duration: 0.2 },
        rotate: { duration: 0.6 }
      }}
    >
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45 group-hover:animate-shimmer"></div>
      
      {/* 图标容器 */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
        </motion.div>
        
        {/* 装饰小星星 */}
        <motion.div
          className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-300 drop-shadow-lg" />
        </motion.div>
      </div>

      {/* 悬浮提示文字 */}
      <motion.div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
      >
        <div className="bg-black/80 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1 rounded-full border border-pink-500/50">
          <span className="text-pink-200 text-xs font-medium whitespace-nowrap">
            💝 魅惑商城
          </span>
        </div>
      </motion.div>

      {/* 脉冲圆圈效果 */}
      <div className="absolute inset-0 rounded-full border-2 border-pink-400/30 animate-ping opacity-75"></div>
      <div className="absolute inset-1 md:inset-2 rounded-full border border-purple-400/50 animate-pulse"></div>
    </motion.button>
  );
}; 