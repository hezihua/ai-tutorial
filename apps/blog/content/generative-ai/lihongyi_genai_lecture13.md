---
title: '🪢 Harness Engineering：模型不是不夠聰明，只是沒有好好引導'
description: 'Agent = Model + Harness。用認知框架、能力邊界與行為流程三層駕馭工程，解釋為什麼同一模型多 80 字規則就能從幻想改檔變成真正修好 bug。'
date: "2026-04-10"
tags: [Harness Engineering, AI Agent, AGENTS.md, 李宏毅]
course: generative-ai
lecture: 15
---

> **課程來源：** 台大李宏毅《機器學習》2026 Spring  
> **影片連結：** [YouTube](https://www.youtube.com/watch?v=R6fZR_9kmIw)  
> **投影片：** [harness.pdf](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/harness.pdf)

---

## 一、這堂課在講什麼？

> **有時候模型完不成任務，不是不夠聰明，而是缺少好的 Harness（駕馭 / 馬具）。**

一句話公式：

```text
Agent = Model + Harness
```

從 Prompt Engineering → Context Engineering → **Harness Engineering**：不只寫好一句話或塞好上下文，而是管整套「怎麼跑起來」。

---

## 二、開場實驗：同一模型，差 80 個字

用很小的開源模型（課上示例為 Gemma 量級、約 2B）修 `parser.py` / 提取 email 的 bug：

| 條件 | 表現 |
|------|------|
| **幾乎無額外引導** | 不先看目錄，**幻想**檔案內容，自我 verify，回報「做完了」——實際沒改對 |
| **多約 80 字規則** | 先 `ls` → `cat` 真檔案 → 修改 → 跑測試 → 真正完成 |

結論：能力上限常常卡在 **引導機制**，不單是參數量。

---

## 三、Harness 是什麼？

- 原意：**馬具**（韁繩、鞍、嚼子）
- 模型像馬：再強，沒有馬具也會亂跑
- **Harness Engineering（駕馭工程）**：設計套在模型外的環境、約束、回饋與流程，讓能力變成可靠結果

人類類比：新人很聰明，但沒文件、沒流程、沒權限說明，一週毫無產出——往往是組織的「馬具」問題。

---

## 四、控制的三個維度

### 4.1 認知框架（Cognitive framework）

用人類語言寫清規則，例如：

- `AGENTS.md` / 系統說明
- 動手前先看目錄、先讀檔案
- 完成標準是什麼（具體 criteria）

→ 決定模型「以什麼世界觀工作」。

### 4.2 能力邊界（Capability boundary）

- 能用哪些工具（bash、讀檔、跑測試……）
- 不能做什麼（權限、危險操作）
- 介面是否清楚（類似 Agent–Computer Interface 思路）

→ 決定「手能伸到哪」。

### 4.3 行為流程（Workflow / loop）

- 規劃 → 生成 → 評估 → 再改
- Generator–Evaluator、測試回饋、迭代直到達標
- 出錯如何重試、如何依據回饋修正

→ 決定「按什麼節奏幹活」，而不是一次生成碰運氣。

結構可寫成：

```text
Model（推理）
    +
Harness
  ├─ 認知框架：規則 / AGENTS.md / 完成標準
  ├─ 能力邊界：工具與權限
  └─ 行為流程：計劃–執行–評估–迭代
    =
可工作的 Agent
```

---

## 五、課上延伸

| 主題 | 要點 |
|------|------|
| **強模型幫弱模型做 Harness** | 例如用更強模型改弱模型的 `agent.md`，弱模型分數可大幅上升；說明 Harness 本身也可被優化 |
| **回饋方式** | 就事論事的指導有效；過度責罵式負面回饋可能讓表現變差 |
| **長期夥伴** | 未來重點不止單次任務，還有記憶整理、持續變強，都依賴好的 Harness，而不只換更大模型 |

---

## 六、和「只怪模型」的對比

| 常見反應 | 課上觀點 |
|----------|----------|
| 「這模型不行」 | 先查 Harness：規則、工具、流程夠不夠 |
| 只堆 Prompt | 必要，但只是認知框架的一部分 |
| 只換更大模型 | 有時不如把小模型的馬具做好 |
| Agent 不穩 | 缺邊界與評估閉環，而不只是「智商不夠」 |

---

## 七、總結

1. **有時候語言模型不是不夠聰明，只是缺乏人類好好引導。**
2. **Agent = Model + Harness**
3. 失敗時先問：**Harness 哪裡鬆了？** 再問模型夠不夠大。

---

**延伸閱讀**：
- 投影片：[harness.pdf](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/harness.pdf)
- 前情：[Context Engineering](/courses/generative-ai/lihongyi_genai_lecture8)（管「給模型看什麼」；本講管「整套怎麼跑」）
