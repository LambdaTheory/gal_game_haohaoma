// 角色配置信息
export interface CharacterConfig {
  id: string;
  name: string;
  displayName: string;
  avatarPath: string;
  isUnlocked: boolean;
  description: string;
}

// 角色配置数据
export const CHARACTER_CONFIGS: Record<string, CharacterConfig> = {
  shenmuli: {
    id: 'shenmuli',
    name: 'shenmuli',
    displayName: '神木丽',
    avatarPath: '/character/shenmuli.png', // 使用默认头像，您可以稍后替换
    isUnlocked: true,
    description: '经典角色，永远的女神～'
  },
  zoe: {
    id: 'zoe',
    name: 'zoe',
    displayName: 'Zoe',
    avatarPath: '/character/zoe.png',
    isUnlocked: false,
    description: '神秘的魅惑女神，等待你的解锁...'
  },
  yumiko: {
    id: 'yumiko',
    name: 'yumiko',
    displayName: 'Yumiko',
    avatarPath: '/character/Yumiko.png',
    isUnlocked: false,
    description: '温柔的东方美人，即将登场...'
  },
  dina: {
    id: 'dina',
    name: 'dina',
    displayName: 'Dina',
    avatarPath: '/character/dina.png',
    isUnlocked: false,
    description: '热情的拉丁女郎，敬请期待...'
  }
};

// 获取角色配置的辅助函数
export const getCharacterConfig = (characterId: string): CharacterConfig => {
  return CHARACTER_CONFIGS[characterId] || CHARACTER_CONFIGS.shenmuli;
};

// 获取角色显示名称的辅助函数
export const getCharacterDisplayName = (characterId: string): string => {
  return getCharacterConfig(characterId).displayName;
};

// 获取角色头像路径的辅助函数
export const getCharacterAvatarPath = (characterId: string): string => {
  return getCharacterConfig(characterId).avatarPath;
}; 