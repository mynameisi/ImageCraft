# ImageCraft 故障排除指南

## 1. 环境配置问题

### 1.1 Node.js 版本不兼容

**问题描述：**
项目启动失败，控制台显示 Node.js 版本不兼容。

**解决方案：**
1. 检查当前 Node.js 版本：
   ```bash
   node --version
   ```
2. 确保使用 v20 或更高版本
3. 如需更新 Node.js，建议使用 nvm：
   ```bash
   nvm install 20
   nvm use 20
   ```

### 1.2 依赖安装失败

**问题描述：**
执行 `npm install` 时出现依赖安装错误。

**解决方案：**
1. 清除 npm 缓存：
   ```bash
   npm cache clean --force
   ```
2. 删除 node_modules 目录和 package-lock.json：
   ```bash
   rm -rf node_modules package-lock.json
   ```
3. 重新安装依赖：
   ```bash
   npm install
   ```

## 2. 数据库连接问题

### 2.1 PostgreSQL 连接失败

**问题描述：**
应用无法连接到 PostgreSQL 数据库。

**解决方案：**
1. 检查 PostgreSQL 服务状态
2. 验证数据库连接 URL 格式：
   ```
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   ```
3. 常见问题检查：
   - 确保 PostgreSQL 服务正在运行
   - 验证数据库用户名和密码
   - 检查数据库是否已创建
   - 确认数据库用户权限

### 2.2 数据库迁移失败

**问题描述：**
执行 `npm run db:push` 时出现迁移错误。

**解决方案：**
1. 确保数据库连接正常
2. 检查数据库用户是否有创建表的权限
3. 验证 schema.ts 文件中的模型定义是否正确
4. 如果表已存在，可能需要先删除现有表：
   ```sql
   DROP TABLE IF EXISTS <table_name>;
   ```

## 3. 开发服务器问题

### 3.1 端口占用

**问题描述：**
启动开发服务器时提示端口 3000 被占用。

**解决方案：**
1. 找出占用端口的进程：
   ```bash
   lsof -i :3000
   ```
2. 终止占用进程：
   ```bash
   kill -9 <PID>
   ```
3. 或者修改项目配置使用其他端口

### 3.2 热重载不生效

**问题描述：**
修改代码后页面不自动刷新。

**解决方案：**
1. 检查 vite.config.ts 配置
2. 清除浏览器缓存
3. 重启开发服务器

## 4. 构建和部署问题

### 4.1 构建失败

**问题描述：**
执行 `npm run build` 时出现构建错误。

**解决方案：**
1. 检查 TypeScript 类型错误
2. 确保所有依赖都正确安装
3. 验证环境变量配置
4. 检查构建脚本配置

### 4.2 生产环境启动失败

**问题描述：**
生产环境下应用无法正常启动。

**解决方案：**
1. 确保环境变量正确配置
2. 检查数据库连接
3. 验证构建文件是否完整
4. 检查服务器防火墙配置

## 5. 其他常见问题

### 5.1 TypeScript 类型错误

**问题描述：**
编译时出现 TypeScript 类型错误。

**解决方案：**
1. 更新 TypeScript 定义
2. 检查 tsconfig.json 配置
3. 确保类型定义正确

### 5.2 样式加载问题

**问题描述：**
Tailwind CSS 样式不生效。

**解决方案：**
1. 检查 postcss.config.js 配置
2. 确保 Tailwind 配置文件正确
3. 清除浏览器缓存
4. 重新构建项目

## 6. 最佳实践建议

1. 定期更新依赖包
2. 保持开发环境和生产环境配置一致
3. 使用版本控制管理代码
4. 定期备份数据库
5. 保持良好的代码规范
6. 及时处理 TypeScript 类型警告