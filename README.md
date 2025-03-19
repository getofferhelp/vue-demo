# vue-demo

# vue-demo

一个基于 Vue 3 + TypeScript 的图标工具集合项目。

## 功能特性

### 1. Font Awesome 图标库

- 支持 Solid、Regular 和 Brands 三种样式的图标
- 实现图标搜索和分类展示
- 支持复制图标名称和 HTML 代码
- 响应式布局设计

### 2. Unicode 字符工具

- 支持多个 Unicode 字符块的展示：
  - 基础拉丁字符
  - 货币符号
  - 箭头符号
  - 数学运算符
  - 制表符
  - 几何图形
  - 其他特殊符号
- 分类浏览和搜索功能
- 支持复制字符和编码

### 3. Unicode Emoji 工具

- 完整的 Unicode Emoji 表情集合
- 按类别分类展示
- 支持关键词搜索
- 支持复制表情和名称

### 4. 主题切换

- 支持亮色/暗色主题切换
- 主题切换动画效果
- 自动保存主题偏好

## 技术栈

- Vue 3
- TypeScript
- Vue Router
- Pinia
- Font Awesome
- Vite

## 项目结构

```
tree
src/
├── components/ # 组件目录
│ ├── BaseIcon.vue # 基础图标组件
│ ├── FontAwesome.vue # Font Awesome 图标展示
│ ├── IconUnicode.vue # Unicode 字符展示
│ └── IconUnicodeEmoji.vue # Emoji 展示
├── data/ # 数据文件
│ ├── icons.ts # 图标相关数据
│ └── unicodeEmojiIcons.ts # Emoji 数据
├── config/ # 配置文件
│ └── icons.ts # 图标配置
├── router/ # 路由配置
└── assets/ # 静态资源
```

## 开发指南

### 安装依赖

```
bash
npm install
```

### 运行项目

```
bash
npm run dev
```

### 代码检查和格式化

```
bash
npm run lint
npm run format
```

## 浏览器支持

- 现代浏览器
- Chrome/Edge/Firefox/Safari 最新版本
- 不支持 IE 浏览器

## 许可证

MIT License
