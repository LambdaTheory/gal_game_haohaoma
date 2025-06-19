'use client';

import React from 'react';
import { useGameState } from '@/hooks/useGameState';
import { GameContainer } from './GameContainer';
import { VideoPlayer } from './VideoPlayer';
import { CharacterInfo } from './CharacterInfo';
import { StaminaDisplay } from './StaminaDisplay';
import { HeartEffects } from './HeartEffects';
import { GameModal } from './GameModal';
import { ShopButton } from './ShopButton';
import { CharacterSelector } from './CharacterSelector';
import { BottomNavigation } from './BottomNavigation';

export const Game: React.FC = () => {
  const {
    gameState,
    modalType,
    heartEffects,
    handleClick,
    buyItem,
    closeModal,
    showDevelopingModal,
    playHiddenVideo,
    playSpecificVideo,
    exitFullscreenPlay,
    setModalType,
    changeCharacter,
  } = useGameState();

  return (
    <GameContainer>
      {/* 视频播放器 */}
      <VideoPlayer
        character={gameState.selectedCharacter}  // 使用当前选择的角色
        videoType={gameState.isPlayingHiddenVideo ? 'hidden-video' : (gameState.currentVideoType || 'demo-video')}
        onClick={handleClick}
        isHiddenVideo={gameState.isPlayingHiddenVideo}
        isFullscreen={gameState.isFullscreenPlaying}
      />

      {/* 全屏播放时的退出按钮 */}
      {gameState.isFullscreenPlaying && (
        <button
          onClick={exitFullscreenPlay}
          className="fixed bottom-6 left-6 z-[9999] bg-black/80 hover:bg-black/90 rounded-full p-4 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{
            backdropFilter: 'blur(10px)',
          }}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      )}

      {/* 非全屏播放时显示的所有UI */}
      {!gameState.isFullscreenPlaying && (
        <>
          {/* 角色信息和进度条 */}
          <CharacterInfo 
            progress={gameState.characterProgress}
            character={gameState.selectedCharacter} // 传递当前选择的角色
            onPlayVideo={playSpecificVideo} // 传递播放视频的回调函数
          />

          {/* 体力显示 */}
          <StaminaDisplay
            current={gameState.currentStamina}
            max={gameState.maxStamina}
            onShopClick={() => setModalType('shop')}
          />

          {/* 爱心特效 */}
          <HeartEffects effects={heartEffects} />

          {/* 弹窗系统 */}
          <GameModal
            type={modalType}
            onClose={closeModal}
            onBuyItem={buyItem}
            onPlayHiddenVideo={playHiddenVideo}
            onOpenShop={() => setModalType('shop')}
          />

          {/* 底部UI容器 - 左右对齐 */}
          <div className="absolute bottom-28 left-4 right-4 flex justify-between items-start pointer-events-none z-20">
            {/* 角色选择器 */}
            <div className="pointer-events-auto">
              <CharacterSelector onCharacterSelect={changeCharacter} />
            </div>
            
            {/* 商城按钮 */}
            {/* <div className="pointer-events-auto">
              <ShopButton onClick={() => setModalType('shop')} />
            </div> */}
          </div>

          {/* 底部导航栏 */}
          <BottomNavigation onShowDevelopingModal={showDevelopingModal} />

          {/* 调试信息（开发时使用）
          {process.env.NODE_ENV === 'development' && (
            <div className="absolute bottom-4 left-4 z-10 bg-black/70 text-white text-xs p-2 rounded">
              <div>进度: {gameState.characterProgress}%</div>
              <div>体力: {gameState.currentStamina}/{gameState.maxStamina}</div>
              <div>胜利: {gameState.isWin ? '是' : '否'}</div>
              <div>隐藏视频: {gameState.isPlayingHiddenVideo ? '是' : '否'}</div>
            </div>
          )} */}
        </>
      )}
    </GameContainer>
  );
}; 