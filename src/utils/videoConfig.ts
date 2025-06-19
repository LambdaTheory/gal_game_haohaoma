// 视频信息配置
export interface VideoInfo {
  id: string;
  name: string;
  fileName: string;
  isUnlocked: boolean;
  unlockCondition?: string; // 解锁条件描述
  thumbnail?: string; // 缩略图路径（可选）
}

// 角色视频配置
export interface CharacterVideos {
  characterId: string;
  videos: VideoInfo[];
}

// 所有角色的视频配置
export const CHARACTER_VIDEOS: Record<string, CharacterVideos> = {
  shenmuli: {
    characterId: 'shenmuli',
    videos: [
      {
        id: 'demo-video',
        name: '基础互动视频',
        fileName: 'demo-video.mp4',
        isUnlocked: true,
        unlockCondition: '默认解锁',
      },
      {
        id: 'video-1',
        name: '特殊互动视频',
        fileName: 'video-1.mp4',
        isUnlocked: false,
        unlockCondition: '亲密度达到50%',
      },
      {
        id: 'hidden-video',
        name: '隐藏福利视频',
        fileName: 'hidden-video.mp4',
        isUnlocked: false,
        unlockCondition: '亲密度达到100%',
      },
    ],
  },
  // 其他角色可以在这里添加
  zoe: {
    characterId: 'zoe',
    videos: [
      {
        id: 'demo-video',
        name: '基础互动视频',
        fileName: 'demo-video.mp4',
        isUnlocked: true,
        unlockCondition: '默认解锁',
      },
    ],
  },
  yumiko: {
    characterId: 'yumiko',
    videos: [
      {
        id: 'demo-video',
        name: '基础互动视频',
        fileName: 'demo-video.mp4',
        isUnlocked: true,
        unlockCondition: '默认解锁',
      },
    ],
  },
  dina: {
    characterId: 'dina',
    videos: [
      {
        id: 'demo-video',
        name: '基础互动视频',
        fileName: 'demo-video.mp4',
        isUnlocked: true,
        unlockCondition: '默认解锁',
      },
    ],
  },
};

// 获取角色的视频列表
export const getCharacterVideos = (characterId: string): VideoInfo[] => {
  const characterVideos = CHARACTER_VIDEOS[characterId];
  return characterVideos ? characterVideos.videos : [];
};

// 获取角色的解锁视频数量
export const getUnlockedVideoCount = (characterId: string): number => {
  const videos = getCharacterVideos(characterId);
  return videos.filter(video => video.isUnlocked).length;
};

// 获取角色的总视频数量
export const getTotalVideoCount = (characterId: string): number => {
  const videos = getCharacterVideos(characterId);
  return videos.length;
};

// 根据亲密度更新视频解锁状态
export const updateVideoUnlockStatus = (characterId: string, progress: number): VideoInfo[] => {
  const videos = getCharacterVideos(characterId);
  return videos.map(video => {
    // 根据不同视频的解锁条件判断是否解锁
    let shouldUnlock = video.isUnlocked; // 默认保持现有状态
    
    switch (video.id) {
      case 'demo-video':
        shouldUnlock = true; // 始终解锁
        break;
      case 'video-1':
        shouldUnlock = progress >= 50; // 亲密度50%解锁
        break;
      case 'hidden-video':
        shouldUnlock = progress >= 100; // 亲密度100%解锁
        break;
    }
    
    return {
      ...video,
      isUnlocked: shouldUnlock,
    };
  });
}; 