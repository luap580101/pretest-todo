# 專案概述

這個專案是一個使用 Next.js 實作的 ToDo List 應用，透過串接後端 API 完成 CRUD 操作。該應用使用 Tailwind CSS 進行樣式設計，並支援響應式網頁設計 (RWD)。此外，本專案使用 TypeScript 進行開發。

## 專案目標

1. 設計任務檢視列表。
2. 設計新增/編輯任務的表單。
3. 更新每項任務的完成狀態（已完成/未完成）。
4. 從列表中移除任務。
5. 支援響應式網頁設計（RWD）。
6. 使用 Tailwind CSS 進行排版和樣式設計。
7. 使用 TypeScript 進行開發。

# 專案結構

```
app
  └── tasks                  # /tasks 路由相關頁面
      ├── layout.tsx         # 任務區域佈局 (提供 Context)
      ├── page.tsx           # 任務列表頁面
      ├── new
      │   └── page.tsx       # 新增任務頁面
      └── [id]
           └── edit
                └── page.tsx # 編輯任務頁面

components
  ├── Pagination.tsx         # 任務頁面切換元件
  └── TaskForm.tsx           # 任務表單元件 (新增/編輯共用)

context/
  └── TaskContext.tsx        # 任務資料的 React Context

lib/
  └── taskApi.ts             # 任務相關 API 請求函式

types.ts                     # 型別定義 (Task 介面等)
```

# 開發模式

## 環境設置

1. 確認 Node.js 版本為 `20.9.0`。

```bash
node -v
```

2. 進入專案資料夾：

```bash
cd chen-todo-web
```

3. 執行開發模式：

```bash
npm run dev
```

---

## 使用 Docker 執行

1. 建立 Docker 映像檔：

```bash
docker build -t chen-next-app .
```

2. 執行 Docker 容器：

```bash
docker run -p 3000:3000 chen-next-app
```

這樣您可以在 Docker 環境中啟動應用，並且能夠透過 `localhost:3000` 存取。
