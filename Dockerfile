# 设置基础的node镜像
FROM node:20-slim AS base
# 接收传入的变量
ARG MAIN_APP_NAME
ARG CHILD_REACT_NAME
ARG CHILD_VUE2_NAME
ARG CHILD_VUE3_NAME
ARG CHILD_SVELTE_NAME

ARG CHILD_REACT_FOLDER
ARG CHILD_VUE2_FOLDER
ARG CHILD_VUE3_FOLDER
ARG CHILD_SVELTE_FOLDER

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
# 设置淘宝源,否则下载 corepack 时, 失败的概率极大, 虽然本来就挺容易失败的...
RUN npm config set registry https://registry.npmmirror.com
COPY . /app
WORKDIR /app

# 安装依赖
FROM base AS installer
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# 打包
FROM installer AS builder
RUN pnpm --filter=$MAIN_APP_NAME build
RUN pnpm --filter=$CHILD_REACT_NAME build
RUN pnpm --filter=$CHILD_VUE2_NAME build
RUN pnpm --filter=$CHILD_VUE3_NAME build
RUN pnpm --filter=$CHILD_SVELTE_NAME build


# 设置nginx镜像
FROM nginx:latest
# 接收传入的变量
ARG MAIN_APP_NAME
ARG CHILD_REACT_NAME
ARG CHILD_VUE2_NAME
ARG CHILD_VUE3_NAME
ARG CHILD_SVELTE_NAME

ARG CHILD_REACT_FOLDER
ARG CHILD_VUE2_FOLDER
ARG CHILD_VUE3_FOLDER
ARG CHILD_SVELTE_FOLDER

# 清理默认的ngnix配置
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# 拷贝nginx的部署配置进去
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建产物到nginx的服务目录
COPY --from=builder /app/apps/${MAIN_APP_NAME}/dist /usr/share/nginx/html
COPY --from=builder /app/apps/${CHILD_REACT_NAME}/build /usr/share/nginx/html/child/${CHILD_REACT_FOLDER}
COPY --from=builder /app/apps/${CHILD_VUE2_NAME}/dist /usr/share/nginx/html/child/${CHILD_VUE2_FOLDER}
COPY --from=builder /app/apps/${CHILD_VUE3_NAME}/dist /usr/share/nginx/html/child/${CHILD_VUE3_FOLDER}
COPY --from=builder /app/apps/${CHILD_SVELTE_NAME}/dist /usr/share/nginx/html/child/${CHILD_SVELTE_FOLDER}

# 暴露80端口
EXPOSE 80
# 将nginx转为前台进程
CMD ["nginx", "-g", "daemon off;"]
