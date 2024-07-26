# 设置基础镜像
FROM node:20-slim AS base
WORKDIR /app

# 安装turbo
RUN npm i -g turbo --registry=https://registry.npmmirror.com

FROM base AS pnpm
RUN corepack enable

# 定义工作区,用来存放代码
FROM base as workspace
COPY . .
RUN turbo prune main-app --docker

# 定义构建器
FROM pnpm AS builder
COPY .gitignore .gitignore
COPY --from=workspace /app/out/json/ .
COPY --from=workspace /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

COPY --from=workspace /app/out/full/ .
# 构建主应用
RUN pnpm exec turbo run build --filter=main-app

# 设置nginx镜像
FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建产物到nginx的服务目录
COPY --from=builder /app/apps/main-app/dist /usr/share/nginx/html

# 暴露80端口
EXPOSE 80
# 将nginx转为前台进程
CMD ["nginx", "-g", "daemon off;"]
