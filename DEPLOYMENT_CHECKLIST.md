# WEiZ 銷售培訓程式上線前置作業清單

## A. 架構與環境
- [ ] 前端（HTML/CSS/JS）部署至正式站（Cloudflare Pages / Vercel）
- [ ] 後端 API（server/app.py）部署至主機
- [ ] MySQL 8+ 建立完成，已執行 `server/schema.sql`
- [ ] 匯入初始資料 `server/seed.sql`
- [ ] 設定 `.env`（密碼、JWT、DB）

## B. 安全
- [ ] 後台入口需登入（admin role）
- [ ] API Token / JWT 啟用
- [ ] CORS 僅開正式網域
- [ ] HTTPS 全站啟用
- [ ] DB 帳號最小權限

## C. 功能驗收
- [ ] 訓練分級（新人/專員/資深專員/組長/店長）可正常出題
- [ ] 題庫管理（新增/編輯/刪除/驗證）正常
- [ ] 新品題庫題目可查可答
- [ ] 錯題複訓模式正常
- [ ] 後台 KPI / 趨勢 / 常錯題正確
- [ ] CSV / XLSX 匯出成功

## D. 稽核與留存
- [ ] 訓練紀錄寫入 DB（session + answers）
- [ ] 關鍵操作寫入 audit_logs
- [ ] 每日備份 DB
- [ ] 保留期策略（至少 12 個月）

## E. 維運
- [ ] 健康檢查 `/health`
- [ ] 監控與告警（服務中斷/DB 連線失敗）
- [ ] 發版流程（測試 -> 預備 -> 正式）
- [ ] 回滾方案已演練
