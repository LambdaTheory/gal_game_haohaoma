# H5 点击游戏

基于 NextJS + TailwindCSS + Framer Motion 开发的竖屏H5点击游戏。

## 功能特性

- 🎮 竖屏游戏体验，适配移动端
- 🎥 视频播放与点击交互
- ❤️ 爱心特效动画
- ⚡ 体力系统与自动回复
- 📊 角色进度条
- 🛒 商城购买系统
- 🏆 胜利条件与隐藏内容
- 📱 响应式设计

## 技术栈

- **前端框架**: Next.js 15 (App Router)
- **样式**: TailwindCSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **语言**: TypeScript

## 项目结构

```
src/
├── app/                 # Next.js App Router
├── components/          # React 组件
│   ├── Game.tsx        # 主游戏组件
│   ├── GameContainer.tsx # 游戏容器
│   ├── VideoPlayer.tsx  # 视频播放器
│   ├── CharacterInfo.tsx # 角色信息
│   ├── StaminaDisplay.tsx # 体力显示
│   ├── HeartEffects.tsx # 爱心特效
│   └── GameModal.tsx   # 弹窗组件
├── hooks/              # 自定义 Hooks
│   └── useGameState.ts # 游戏状态管理
├── types/              # TypeScript 类型定义
│   └── game.ts         # 游戏相关类型
├── utils/              # 工具函数
│   └── gameConfig.ts   # 游戏配置
└── assets/             # 静态资源
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
```

## 游戏配置

游戏的主要配置在 `src/utils/gameConfig.ts` 中：

- **体力系统**: 最大体力20点，每次点击消耗2点，每10秒回复1点
- **进度系统**: 每次点击增加2%进度，达到100%胜利
- **动画时长**: 爱心特效1秒，进度条动画0.3秒

## 所需资源文件

请在 `public/` 目录下放置以下文件：

- `demo-video.mp4` - 主游戏视频
- `hidden-video.mp4` - 隐藏奖励视频
- `avatar.png` - 角色头像（可选）

## 游戏玩法

1. 点击视频区域消耗体力获得进度
2. 体力不足时等待自动回复或购买电池
3. 达到100%进度即可胜利
4. 胜利后可观看隐藏奖励视频

## 开发说明

### 自定义配置

- 修改 `gameConfig.ts` 调整游戏参数
- 在 `types/game.ts` 中扩展类型定义
- 组件样式基于 TailwindCSS，可自由定制

### 状态管理

使用 `useGameState` Hook 管理游戏状态：
- 体力系统
- 进度追踪
- 弹窗控制
- 特效管理

### 移动端优化

- 禁用用户缩放和选择
- 优化触摸体验
- 竖屏布局适配

## 许可证

MIT License
