# HELLO IRYS - 数据上传教程

一个漂亮的交互式教程，教你如何使用 Irys 实现永久数据存储。

## ✨ 特性

- 🎨 现代化的深色主题 UI
- 🌐 中英文双语支持，一键切换
- 📚 分步教程，从基础到进阶
- 💫 流畅的动画效果
- 📱 响应式设计
- 👛 内置钱包连接，支持 Irys 测试网

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置钱包连接（可选）

如果你想使用钱包连接功能，需要获取免费的 WalletConnect Project ID：

1. 访问 [WalletConnect Cloud](https://cloud.walletconnect.com)
2. 注册并创建项目
3. 复制 Project ID
4. 在以下文件中替换 `YOUR_WALLETCONNECT_PROJECT_ID`：
   - `src/config/wagmi.ts`
   - `src/main.tsx`

详细说明请查看 [WALLET_SETUP.md](./WALLET_SETUP.md)

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📖 教程内容

1. **第一步：了解 Irys** - 介绍 Irys 的概念和核心特性
2. **第二步：环境准备** - 安装依赖和配置开发环境
3. **第三步：上传数据** - 学习如何上传文本和文件
4. **第四步：查询数据** - 了解如何查询和检索数据
5. **第五步：进阶使用** - 探索高级功能和最佳实践

## 🛠️ 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **Wagmi** - Web3 React Hooks
- **Web3Modal** - 钱包连接界面
- **Ethers.js** - 以太坊交互

## 👛 钱包功能

应用右上角集成了钱包连接组件，功能包括：

- ✅ 一键连接 MetaMask、WalletConnect 等钱包
- ✅ 自动识别 Arbitrum Sepolia（Irys 测试网）
- ✅ 实时显示余额和账户地址
- ✅ 网络状态指示器
- ✅ 自动重连和网络切换

## 🌐 语言切换

点击侧边栏右上角的语言切换按钮可以在中文和英文之间切换。

## 📝 许可证

MIT License

## 🔗 相关链接

- [Irys 官方文档](https://docs.irys.xyz)
- [Irys GitHub](https://github.com/Irys-xyz)



