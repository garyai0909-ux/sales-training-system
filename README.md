# sales-training-game（WEiZ 銷售培訓闖關）

純前端（HTML/CSS/JS）銷售訓練系統，支援：
- 學員闖關 + 錯題複訓
- 題庫後台 CRUD（新增/編輯/刪除/驗證）
- 主管儀表（常錯題、能力維度、近14日趨勢）
- 匯出報表（CSV / XLSX）

## 啟動方式（本機）

在專案目錄執行：

```bash
cd /Users/weiboai/.openclaw/workspace/sales-training-game
python3 -m http.server 8787
```

開啟：
- 主頁（銷售儀表板）：`http://localhost:8787/index.html`
- 儀表板直達：`http://localhost:8787/training-dashboard.html`
- 舊版闖關頁：`http://localhost:8787/legacy-training.html`
- 後台頁：`http://localhost:8787/admin.html`

## 可外網展示方式（臨時 Demo）

若本機已安裝 ngrok：

```bash
cd /Users/weiboai/.openclaw/workspace/sales-training-game
python3 -m http.server 8787
# 新開一個 terminal
ngrok http 8787
```

將 ngrok 提供的 `https://xxxx.ngrok-free.app` 分享給外部即可。

## 題庫格式

題庫存在 `localStorage.questionBank`，格式：

```json
{
  "version": "v2",
  "notes": "選項會隨機排序；answer 必須存在 options 內",
  "questions": [
    {
      "id": "q1",
      "type": "基本QA",
      "dimension": "產品知識",
      "title": "關卡1｜品牌定位",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "answer": "B",
      "explain": "...",
      "imageKey": "charger"
    }
  ]
}
```

## 功能重點

1. **UX / 手機版優化**：響應式版面、按鈕可觸控、資訊區塊化
2. **題庫管理完整化**：後台直接 CRUD + 驗證錯誤顯示
3. **錯題複訓強化**：整合歷史錯題池，複訓模式會加入再練題
4. **成績分析**：KPI、常錯題、能力維度弱項、近14日趨勢
5. **報表輸出**：CSV 與 XLSX（SheetJS）
6. **穩定性**：localStorage 讀寫保護、題庫正規化與資料防呆

## 主要檔案

- `index.html`：主入口（導向銷售儀表板）
- `training-dashboard.html`：銷售儀表板（含教練模式）
- `legacy-training.html`：舊版學員闖關頁
- `script.js`：闖關流程與儲存邏輯（legacy 頁）
- `admin.html`：後台 UI
- `admin.js`：主管儀表 + 題庫管理 + 匯出
- `styles.css`：共用樣式（含 RWD）
- `CHANGELOG.md`：本次改版紀錄
- `server/schema.sql`：正式 MySQL 資料庫結構
- `server/seed.sql`：初始資料
- `server/app.py`：後端 API 雛型（health）
- `DEPLOYMENT_CHECKLIST.md`：上線前檢查清單

## SQL 資料庫格式（上線版）

已建立 MySQL 版 schema，核心資料表：

- `users`：員工與角色/階段
- `question_bank`：題庫（含 stage/type/dimension）
- `training_sessions`：每次訓練主檔
- `training_answers`：逐題作答紀錄
- `audit_logs`：稽核留痕
- `v_training_summary`：主管檢視用視圖

### 建庫步驟

```bash
mysql -u root -p < server/schema.sql
mysql -u root -p < server/seed.sql
```

## 上線前置作業

請依 `DEPLOYMENT_CHECKLIST.md` 執行，最低要求：

1. DB 建立 + 權限設定
2. 後台登入保護
3. HTTPS + CORS 白名單
4. 功能驗收（分級、題庫、新品題、匯出）
5. 稽核留存與每日備份
