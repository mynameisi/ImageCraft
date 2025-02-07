# ImageCraft 项目启动指南

## 1. 环境要求

- Node.js (推荐使用 v20 或更高版本)
- PostgreSQL 数据库
- npm 包管理器

## 2. 项目初始化

### 2.1 克隆项目

```bash
git clone <repository-url>
cd ImageCraft
```

### 2.2 安装依赖

```bash
npm install
```

## 3. 数据库配置

### 3.1 环境变量设置

1. 在项目根目录创建 `.env` 文件
2. 添加数据库连接配置：

```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
```

### 3.2 数据库迁移

执行数据库迁移命令：

```bash
npm run db:push
```

## 4. 启动项目

### 4.1 开发环境

启动开发服务器：

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

### 4.2 生产环境

1. 构建项目：

```bash
npm run build
```

2. 启动服务：

```bash
npm run start
```

## 5. 项目结构

```
├── client/              # 前端代码
│   ├── src/            # 源代码
│   │   ├── components/ # React 组件
│   │   ├── hooks/     # 自定义 Hooks
│   │   ├── lib/       # 工具函数
│   │   └── pages/     # 页面组件
├── server/             # 后端代码
│   ├── routes.ts      # API 路由
│   ├── storage.ts     # 数据存储逻辑
│   └── vite.ts        # Vite 服务器配置
└── shared/            # 共享代码
    └── schema.ts      # 数据模型定义
```

## 6. 技术栈

- 前端：React + TypeScript + Vite
- 后端：Express.js
- 数据库：PostgreSQL
- 样式：Tailwind CSS
- 图像处理：CamanJS

## 7. 常见问题

### 7.1 数据库连接问题

确保：
- PostgreSQL 服务已启动
- 数据库连接 URL 格式正确
- 数据库用户有足够权限

### 7.2 开发服务器启动失败

检查：
- 端口 3000 是否被占用
- 所有依赖是否正确安装
- Node.js 版本是否符合要求

## 8. 开发工具建议

- VSCode 或其他支持 TypeScript 的 IDE
- PostgreSQL 客户端工具（如 pgAdmin）
- Git 版本控制工具

## 9. 部署注意事项

1. 确保生产环境的环境变量配置正确
2. 使用 `npm run build` 生成生产环境代码
3. 配置正确的数据库连接信息
4. 确保服务器防火墙允许应用端口访问