import { GameConfig, ShopItem } from '@/types/game';

// 游戏基础配置
export const GAME_CONFIG: GameConfig = {
  staminaSystem: {
    current: 20,
    max: 20,
    regenRate: 10, // 10秒回复1点体力
    regenAmount: 1,
    costPerClick: 2, // 每次点击消耗2点体力
  },
  progressPerClick: 2, // 每次点击增加2%进度
  winThreshold: 100, // 进度达到100%胜利
};

// 商城商品配置
export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'energy-drink',
    name: '💊 能量药水',
    description: '立即回复5点体力',
    price: 1,
    type: 'stamina',
    effect: {
      stamina: 5,
    },
  },
  {
    id: 'super-battery',
    name: '⚡ 超级电池',
    description: '立即回复15点体力',
    price: 3,
    type: 'stamina',
    effect: {
      stamina: 15,
    },
  },
  {
    id: 'full-restore',
    name: '💝 完全恢复',
    description: '立即回满体力',
    price: 5,
    type: 'stamina',
    effect: {
      stamina: 20,
    },
  },
  {
    id: 'love-potion',
    name: '💘 爱情药水',
    description: '亲密度+10%',
    price: 8,
    type: 'progress',
    effect: {
      progress: 10,
    },
  },
  {
    id: 'magic-kiss',
    name: '💋 魔法之吻',
    description: '亲密度+25%',
    price: 15,
    type: 'progress',
    effect: {
      progress: 25,
    },
  },
  {
    id: 'stamina-upgrade',
    name: '🔋 体力扩容',
    description: '永久增加5点最大体力',
    price: 20,
    type: 'other',
    effect: {
      stamina: 5, // 这里表示增加最大体力
    },
  },
];

// 游戏常量
export const GAME_CONSTANTS = {
  // 视频播放相关
  VIDEO_LOOP: true,
  VIDEO_MUTED: true,
  
  // 动画持续时间
  HEART_ANIMATION_DURATION: 1000, // 爱心特效持续1秒
  PROGRESS_ANIMATION_DURATION: 300, // 进度条动画持续0.3秒
  
  // 容器尺寸（竖屏）
  MOBILE_WIDTH: 420,
  MOBILE_HEIGHT: 812,
} as const; 