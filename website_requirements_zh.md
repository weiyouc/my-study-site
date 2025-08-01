# SAT备考网站需求文档

## 1. 概述
一个遵循Fluent Design设计规范的个人SAT备考网站，支持移动端适配。

## 2. 页面布局

### 2.1 全局元素
- **顶部导航栏** (固定位置)：
  - 导航 (默认选中)
  - 课程
  - 作业
  - 关于我

### 2.2 主页 (默认视图)
- **搜索界面**：
  - 居中搜索框，提示文字"搜索课程..."
  - 下方显示最近搜索记录
  - 快速筛选选项 (如按科目、难度)

### 2.3 导航页面
- **双栏布局**：
  - 左侧边栏 (30%宽度)：
    - 分类组 (如数学、阅读、写作)
    - 每个组下的子分类
    - 展开/折叠功能
  - 主内容区 (70%宽度)：
    - 卡片式导航网格
    - 响应式网格 (桌面3列/平板2列/手机1列)

## 3. 卡片设计
每张卡片包含：
- **科目** (如"代数"、"阅读理解")
- **简介** (1-2句话描述)
- **标签** (如#方程、#文章分析)
- **进度指示器**：
  - 圆形进度条
  - 完成百分比
  - 状态标签 (未开始/进行中/已完成)

## 4. 响应式设计
- **移动端适配**：
  - 可折叠侧边栏 (汉堡菜单)
  - 卡片网格切换为单列
  - 简化导航栏 (图标为主)
- **断点设置**：
  - 桌面端: >1024px
  - 平板端: 768px-1024px
  - 手机端: <768px

## 5. Fluent Design规范
- **视觉风格**：
  - 深度效果 (阴影、层级)
  - 悬停高亮效果
  - 微妙动画 (卡片过渡、焦点效果)
- **配色方案**：
  - 主色: 柔和蓝 (#4F6DF5)
  - 辅色: 浅灰 (#F5F5F5)
  - 强调色: 活力紫 (#8A2BE2)
- **字体规范**：
  - 标题: Segoe UI Semibold
  - 正文: Segoe UI Regular

## 6. 功能需求
- **搜索功能**：
  - 实时过滤
  - 分类筛选
- **进度跟踪**：
  - 手动更新进度
  - 视觉状态指示器
- **导航系统**：
  - 持久状态管理
  - 面包屑导航

## 7. 未来扩展
- 深色模式实现
- 进度分析仪表盘
- 卡片资源附件功能 