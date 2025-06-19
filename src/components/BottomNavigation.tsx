'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BottomNavigationProps {
  onShowDevelopingModal: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  onShowDevelopingModal
}) => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { 
      id: 'home', 
      label: '主页', 
      emoji: '🏠',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      available: true
    },
    { 
      id: 'gifts', 
      label: '礼物', 
      emoji: '💝',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      available: false
    },
    { 
      id: 'date', 
      label: '约会', 
      emoji: '💕',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      available: false
    },
    { 
      id: 'money', 
      label: '赚钱', 
      emoji: '💎',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      available: false
    }
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    if (tab.available) {
      setActiveTab(tab.id);
    } else {
      onShowDevelopingModal();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
      {/* 背景装饰 - 性感渐变 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/30 to-transparent pointer-events-none" />
      
      {/* 导航栏容器 - 诱惑风格 */}
      <div 
        className="relative backdrop-blur-md border-t-2 border-pink-500/30"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(88, 28, 135, 0.4), rgba(147, 51, 234, 0.3))',
          boxShadow: '0 -8px 32px rgba(236, 72, 153, 0.3), 0 0 20px rgba(168, 85, 247, 0.2)'
        }}
      >
        {/* 顶部装饰线 */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse" />
        
        <div className="flex items-center justify-around py-4 px-2">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`
                relative flex flex-col items-center justify-center space-y-1 px-4 py-2 rounded-2xl
                transition-all duration-300 min-w-[70px] group
                ${activeTab === tab.id && tab.available
                  ? 'text-pink-300' 
                  : tab.available
                    ? 'text-white/70 hover:text-pink-300'
                    : 'text-white/50 hover:text-pink-200'
                }
              `}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                // 活跃tab的脉冲效果
                ...(activeTab === tab.id && tab.available && {
                  boxShadow: [
                    '0 0 0px rgba(236, 72, 153, 0)',
                    '0 0 20px rgba(236, 72, 153, 0.4)',
                    '0 0 0px rgba(236, 72, 153, 0)'
                  ]
                })
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity }
              }}
              style={{
                // 活跃tab的背景
                ...(activeTab === tab.id && tab.available && {
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(236, 72, 153, 0.3)'
                }),
                // 非活跃tab的悬浮效果
                ...(!tab.available && {
                  position: 'relative'
                })
              }}
            >
              {/* 背景光晕效果 */}
              {activeTab === tab.id && tab.available && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 100%'
                  }}
                />
              )}
              
              {/* 图标和emoji组合 */}
              <div className={`
                relative transition-all duration-300
                ${activeTab === tab.id && tab.available ? 'scale-110' : 'scale-100'}
                group-hover:scale-110
              `}>
                {/* 主图标 */}
                <div className="relative">
                  {tab.icon}
                  
                  {/* emoji装饰 */}
                  <motion.div
                    className="absolute -top-1 -right-1 text-xs"
                    animate={activeTab === tab.id && tab.available ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {tab.emoji}
                  </motion.div>
                </div>
              </div>
              
              {/* 标签文字 */}
              <span className={`
                text-xs font-medium transition-all duration-300
                ${activeTab === tab.id && tab.available 
                  ? 'text-pink-300 font-bold' 
                  : ''
                }
              `}>
                {tab.label}
              </span>
              
              {/* 开发中标识 - 性感小心心 */}
              {!tab.available && (
                <motion.div 
                  className="absolute -top-1 -right-1 text-xs"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  💋
                </motion.div>
              )}
              
              {/* 活跃指示器 - 性感下划线 */}
              {activeTab === tab.id && tab.available && (
                <motion.div 
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #ec4899, #a855f7, #ec4899)',
                    backgroundSize: '200% 100%',
                    boxShadow: '0 0 8px rgba(236, 72, 153, 0.6)'
                  }}
                  animate={{
                    width: ['20px', '30px', '20px'],
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    width: { duration: 1.5, repeat: Infinity },
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
                  }}
                />
              )}

              {/* 悬浮光效 */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-pink-400/10 to-transparent animate-pulse" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* 底部装饰波浪线 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <motion.div
            className="h-full w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 100%'
            }}
          />
        </div>
      </div>
    </div>
  );
}; 