# 使用官方 Node.js 作為基底映像檔
FROM node:20.9.0 AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json（如果存在）
COPY package.json package-lock.json ./

# 安裝依賴
RUN npm install

# 複製整個專案檔案
COPY . .

# 建立 Next.js 專案
RUN npm run build

# 使用更小的基底映像檔來運行應用（選擇輕量的 Node 映像檔）
FROM node:20.9.0-slim

# 設定工作目錄
WORKDIR /app

# 複製從 builder 階段生成的應用檔案
COPY --from=builder /app /app

# 安裝生產環境依賴
RUN npm install --production

# 開放應用的埠，預設為 3000
EXPOSE 3000

# 設定容器啟動時執行的命令
CMD ["npm", "start"]
