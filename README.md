# AmierHan 数据分析作品集网站

一个用于展示个人数据分析能力的 React/Vite/TypeScript 作品集网站，面向 HR / 面试官快速浏览。当前收录 7 个作品，其中包含新增的《2026 华数杯 AI 电力分析》论文。

## 项目内容

网站当前包含以下路由：

- `#/`：首页工作台（个人定位、简历摘要、精选项目与探索入口）
- `#/dashboards`：看板项目筛选列表
- `#/research`：研究项目筛选列表
- `#/about`：个人能力与联系方式
- `#/project/:slug`：项目详情、图片/PDF预览

风格关键词：高级感、简洁、数据作品导向、统一视觉语言。

## 目录结构

```text
个人作品集网站搭建/
├─ index.html                 # Vite 入口
├─ src/                       # React 页面、组件、内容模型与样式
├─ public/                    # 运行时公共资源（如有）
├─ 其他素材/                  # 仅供维护参考，不进入生产构建（含完整简历）
├─ package.json
├─ vite.config.ts
└─ dist/                      # npm run build 生成，不提交
```

## 本地预览

在项目目录执行：

```powershell
npm install
npm run dev
```

然后在浏览器打开：

- `http://localhost:5173/`

生产构建与本地预览：

```powershell
npm run build
npm run preview
```

## 作品维护说明

1. 在 `src/content/projects.ts` 增加项目元数据、slug、能力标签与媒体资源。
2. 将项目原图/PDF 放入 `作品/`，将 PDF 首页预览图放入 `assets/previews/`，再通过 Vite import 使用。
3. 运行 `npm run typecheck && npm run test && npm run build` 完成提交前检查。

首页的 `Resume snapshot` 只展示从简历提取的教育、实习、技能和奖项摘要，`ProjectOrbit` 使用真实作品预览做环绕展示，不公开完整简历 PDF；右上角 `生成入口` 和页面右上角 FrankenFigs 形象均为本地资源，形象点击后才打开原始 Figma 社区素材。网站不上传或引用未经确认的视频素材。
