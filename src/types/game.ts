// 游戏状态类型
export interface GameState {
  // 角色进度 (0-100)
  characterProgress: number;
  // 当前体力
  currentStamina: number;
  // 最大体力
  maxStamina: number;
  // 游戏是否胜利
  isWin: boolean;
  // 是否正在播放隐藏视频
  isPlayingHiddenVideo: boolean;
  // 当前选择的角色名称
  selectedCharacter: string;
  // 当前播放的视频类型
  currentVideoType?: string;
  // 是否在全屏播放模式
  isFullscreenPlaying: boolean;
}

// 体力系统类型
export interface StaminaSystem {
  current: number;
  max: number;
  regenRate: number; // 体力回复间隔(秒)
  regenAmount: number; // 每次回复的体力值
  costPerClick: number; // 每次点击消耗的体力
}

// 商品类型
export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'stamina' | 'progress' | 'other';
  effect: {
    stamina?: number;
    progress?: number;
  };
}

// 爱心特效类型
export interface HeartEffect {
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

// 弹窗类型
export type ModalType = 'none' | 'insufficient-stamina' | 'shop' | 'victory' | 'developing';

// 游戏配置类型
export interface GameConfig {
  staminaSystem: StaminaSystem;
  progressPerClick: number; // 每次点击增加的进度
  winThreshold: number; // 胜利所需进度
} 