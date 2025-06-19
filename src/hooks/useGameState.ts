import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, ModalType, HeartEffect } from '@/types/game';
import { GAME_CONFIG, SHOP_ITEMS } from '@/utils/gameConfig';

export const useGameState = () => {
  // 游戏基础状态
  const [gameState, setGameState] = useState<GameState>({
    characterProgress: 0,
    currentStamina: GAME_CONFIG.staminaSystem.max,
    maxStamina: GAME_CONFIG.staminaSystem.max,
    isWin: false,
    isPlayingHiddenVideo: false,
    selectedCharacter: 'shenmuli', // 默认角色
    currentVideoType: 'demo-video', // 默认播放demo视频
    isFullscreenPlaying: false, // 默认不在全屏播放模式
  });

  // 弹窗状态
  const [modalType, setModalType] = useState<ModalType>('none');
  
  // 爱心特效状态
  const [heartEffects, setHeartEffects] = useState<HeartEffect[]>([]);
  
  // 体力回复定时器
  const staminaTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 开始体力回复定时器
  const startStaminaRegen = useCallback(() => {
    if (staminaTimerRef.current) {
      clearInterval(staminaTimerRef.current);
    }
    
    staminaTimerRef.current = setInterval(() => {
      setGameState(prev => {
        if (prev.currentStamina < prev.maxStamina) {
          return {
            ...prev,
            currentStamina: Math.min(
              prev.currentStamina + GAME_CONFIG.staminaSystem.regenAmount,
              prev.maxStamina
            ),
          };
        }
        return prev;
      });
    }, GAME_CONFIG.staminaSystem.regenRate * 1000);
  }, []);

  // 停止体力回复定时器
  const stopStaminaRegen = useCallback(() => {
    if (staminaTimerRef.current) {
      clearInterval(staminaTimerRef.current);
      staminaTimerRef.current = null;
    }
  }, []);

  // 点击处理
  const handleClick = useCallback((x: number, y: number) => {
    setGameState(prev => {
      // 检查体力是否足够
      if (prev.currentStamina < GAME_CONFIG.staminaSystem.costPerClick) {
        setModalType('insufficient-stamina');
        return prev;
      }

      // 检查是否已经胜利
      if (prev.isWin) {
        return prev;
      }

      // 消耗体力并增加进度
      const newStamina = prev.currentStamina - GAME_CONFIG.staminaSystem.costPerClick;
      const newProgress = Math.min(
        prev.characterProgress + GAME_CONFIG.progressPerClick,
        GAME_CONFIG.winThreshold
      );

      // 检查是否胜利
      const isWin = newProgress >= GAME_CONFIG.winThreshold;
      if (isWin) {
        setModalType('victory');
      }

      return {
        ...prev,
        currentStamina: newStamina,
        characterProgress: newProgress,
        isWin,
      };
    });

    // 添加爱心特效
    const heartId = Date.now().toString();
    const newHeart: HeartEffect = {
      id: heartId,
      x,
      y,
      timestamp: Date.now(),
    };
    
    setHeartEffects(prev => [...prev, newHeart]);
    
    // 1秒后移除爱心特效
    setTimeout(() => {
      setHeartEffects(prev => prev.filter(heart => heart.id !== heartId));
    }, 1000);
  }, []);

  // 购买商品
  const buyItem = useCallback((itemId: string) => {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    setGameState(prev => {
      const newState = { ...prev };

      // 根据商品类型处理效果
      switch (item.type) {
        case 'stamina':
          if (item.id === 'stamina-upgrade') {
            // 体力扩容 - 增加最大体力
            newState.maxStamina = prev.maxStamina + (item.effect.stamina || 0);
            newState.currentStamina = prev.currentStamina + (item.effect.stamina || 0);
          } else {
            // 普通体力恢复
            newState.currentStamina = Math.min(
              prev.currentStamina + (item.effect.stamina || 0),
              prev.maxStamina
            );
          }
          break;
          
        case 'progress':
          // 直接增加进度
          const newProgress = Math.min(
            prev.characterProgress + (item.effect.progress || 0),
            GAME_CONFIG.winThreshold
          );
          newState.characterProgress = newProgress;
          
          // 检查是否胜利
          if (newProgress >= GAME_CONFIG.winThreshold && !prev.isWin) {
            newState.isWin = true;
            // 延迟显示胜利弹窗，让用户看到进度变化
            setTimeout(() => setModalType('victory'), 500);
            return newState;
          }
          break;
          
        case 'other':
          // 其他特殊效果可以在这里处理
          break;
      }

      return newState;
    });
    
    setModalType('none');
  }, []);

  // 关闭弹窗
  const closeModal = useCallback(() => {
    setModalType('none');
  }, []);

  // 显示开发中弹窗
  const showDevelopingModal = useCallback(() => {
    setModalType('developing');
  }, []);

  // 播放隐藏视频
  const playHiddenVideo = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPlayingHiddenVideo: true,
      isFullscreenPlaying: true, // 启用全屏播放模式，隐藏所有UI元素
    }));
    setModalType('none');
  }, []);

  // 播放特定视频
  const playSpecificVideo = useCallback((videoId: string) => {
    if (videoId === 'hidden-video') {
      // 播放隐藏视频
      playHiddenVideo();
    } else {
      // 播放其他视频，切换到全屏播放模式
      setGameState(prev => ({
        ...prev,
        isPlayingHiddenVideo: false,
        currentVideoType: videoId, // 设置当前播放的视频类型
        isFullscreenPlaying: true, // 启用全屏播放模式
      }));
    }
  }, [playHiddenVideo]);

  // 退出全屏播放
  const exitFullscreenPlay = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isFullscreenPlaying: false,
      isPlayingHiddenVideo: false, // 同时停止播放隐藏视频
      currentVideoType: 'demo-video', // 回到默认视频
    }));
  }, []);

  // 切换角色
  const changeCharacter = useCallback((characterName: string) => {
    setGameState(prev => ({
      ...prev,
      selectedCharacter: characterName,
      isPlayingHiddenVideo: false, // 切换角色时停止播放隐藏视频
      currentVideoType: 'demo-video', // 重置为默认视频
    }));
  }, []);

  // 重置游戏
  const resetGame = useCallback(() => {
    setGameState({
      characterProgress: 0,
      currentStamina: GAME_CONFIG.staminaSystem.max,
      maxStamina: GAME_CONFIG.staminaSystem.max,
      isWin: false,
      isPlayingHiddenVideo: false,
      selectedCharacter: 'shenmuli', // 重置为默认角色
      currentVideoType: 'demo-video', // 重置为默认视频
      isFullscreenPlaying: false, // 重置全屏播放状态
    });
    setModalType('none');
    setHeartEffects([]);
  }, []);

  // 组件挂载时开始体力回复
  useEffect(() => {
    startStaminaRegen();
    return () => stopStaminaRegen();
  }, [startStaminaRegen, stopStaminaRegen]);

  return {
    // 状态
    gameState,
    modalType,
    heartEffects,
    
    // 方法
    handleClick,
    buyItem,
    closeModal,
    showDevelopingModal,
    playHiddenVideo,
    playSpecificVideo,
    exitFullscreenPlay,
    resetGame,
    setModalType,
    changeCharacter,
  };
}; 