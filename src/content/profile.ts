import avatarUrl from "../../assets/avatar-amierhan.jpg";

interface ResumeExperience {
  company: string;
  role: string;
  period: string;
  highlights: readonly string[];
  tools?: readonly string[];
}

interface ResumeProject {
  title: string;
  period: string;
  points: readonly string[];
  tools?: readonly string[];
}

function periodStartKey(period: string) {
  const match = period.match(/(\d{4})\.(\d{2})/);
  return match ? Number(match[1]) * 12 + Number(match[2]) : 0;
}

function recentFirst<T extends { period: string }>(entries: readonly T[]) {
  return [...entries].sort((a, b) => periodStartKey(b.period) - periodStartKey(a.period));
}

const experiences: ResumeExperience[] = [
  {
    company: "跨企查｜数据开发部",
    role: "数据分析实习生",
    period: "2026.05 — 2026.08",
    tools: ["Python", "SQL", "MySQL/RDS", "ETL", "Tesseract OCR", "REST API", "Windows Batch", "企业微信机器人", "JavaScript"],
    highlights: [
      "采集链路优化：针对卖家精灵全球站点采集中的验证码和轻量服务器 OOM 问题，部署 Tesseract 本地 OCR、企业微信群机器人人工兜底及基于 RDS 写入监控的自动重启机制；每日采集量由 12,000+ 提升至 45,000+，人工介入时间减少 95%+，T+1 月度任务压缩至 2 周，会员账号采购成本降低 60%。",
      "企业匹配优化：负责 Amazon 店铺与企查查/天眼查企业匹配，复盘 2,000+ 条失败样本，补充公司名称谐音、法人拼音等清洗与匹配规则；将八爪鱼 RPA 多机采集改为天眼查接口并发调用，信息调取周期由 4 天缩短至 1 天，整体匹配流程由 2 周缩短至 3 天，匹配成功率提升至 90%+（美国站点 90%、欧洲站点 99%+、其他站点 92%+）。",
      "ETL 工程化：重构匹配数据链路，在 ODS/DWD 相关表引入 batch_id + create_time 批次标识，增加临时表与历史备份表，解决大批量匹配中断、任务批次混淆和结果回溯问题；将重复的算法匹配与写表流程封装为 Python 命令，提升流程复用性和交付稳定性。",
      "数据同步与规范建设：设计在线表格实施信息同步规范，联动 ODS 去重 ASIN、业务 DWD 当月匹配结果及浏览器开发者工具 JavaScript 实时校验，支持 300+ 产品一级类目在 10 分钟内完成更新；协助其他采集任务开发并沉淀 8 份 SOP。",
    ],
  },
  {
    company: "易成教育",
    role: "数据运营实习生",
    period: "2025.07 — 2025.09",
    highlights: [
      "处理年度 1 万+ 条学生课时、缴费与退款数据。",
      "将数据准确率从约 60% 提升至 99%+，人工整理时间减少 60%。",
      "建立财务备注标准化 SOP，人工误差降至 1% 以下。",
    ],
  },
];

const resumeProjects: ResumeProject[] = [
  {
    title: "跨境商业新闻智能打标与情报结构化系统（Agent Workflow）",
    period: "2026.07 — 2026.08",
    tools: ["Python", "MySQL", "Claude Code Workflow", "DeepSeek", "Playwright MCP", "Chrome DevTools MCP"],
    points: [
      "数据底座：面向跨企查跨境企业洞察场景，从 16 张 ODS 新闻源表增量提取链接，完成去重、日期标准化、来源映射与任务汇总，构建统一新闻分析数据表，支持 T+1 日更。",
      "Workflow 搭建：使用 Claude Code Workflow 与 DeepSeek 编排多 Agent 流水线，按“Fetch—Analyze”两阶段并行处理新闻；调用 Playwright、Chrome DevTools 等浏览器工具获取正文，并针对验证码、失效链接等异常设计 WebSearch、缓存及 API 多级降级策略。",
      "智能分析：设计新闻分析 Prompt 与结构化结果校验，自动提取发布日期、中文标题、摘要、标签和来源，并将新闻归类至政治外交、经贸、科技竞争、地缘安全、全球治理五类主题。",
      "工程化保障：基于 Python + MySQL 实现任务分发、结果回写和 CSV 导出，设计 init/handling/success/failed/stop 状态机，结合事务与 FOR UPDATE 锁支持多会话并发不重复、断点续跑、失败追踪与重试。",
      "运行结果：单批处理 5 条新闻平均约 8 分钟，整体处理成功率约 97%，将人工逐条检索整理转化为可持续运行的 T+1 新闻情报生产流程，为企业画像和跨境业务分析提供结构化数据支持。",
    ],
  },
  {
    title: "省域研发投入与高质量知识产权转化差异识别及预测",
    period: "2026.04 — 2026.05",
    points: [
      "整合国家统计局、科技部、国家知识产权局等公开数据，构建 31 个省级地区、2020—2024 年平衡面板数据。",
      "使用熵权法、四象限识别、KMeans、双向固定效应和集成模型完成差异识别与预测，调整后 R²=0.9523。",
      "借助 Codex 组织数据抽取、Notebook 建模、图表生成和论文排版，沉淀 6 个 Notebook 及 PDF/Word 双版本成果。",
    ],
  },
  {
    title: "国际物流结算计费系统监控",
    period: "2026.01 — 2026.02",
    points: [
      "完成 RDS → DataWorks → MaxCompute 的 ODS/DIM/DWD/DWS 四层数仓分层，数据处理效率提升 60%。",
      "围绕计费规模、计费质量和计费风控搭建指标体系，并使用 FineBI 开发多维监控看板。",
      "定位调账节点与异常原因，验证计费准确率、线上化率稳定在 99.8% 以上，支持运营复盘与成本管控。",
    ],
  },
  {
    title: "自动化账号视频数据分析面板",
    period: "2025.09 — 2025.10",
    points: [
      "使用影刀 RPA 搭建日粒度自动化采集，沉淀粉丝、视频互动等 MySQL 数据资产，采集效率提升 80%+。",
      "通过 Tableau 直连 MySQL，搭建粉丝规模、净增关注、视频表现和涨粉贡献的多维分析看板。",
      "建立环比异常监控，定位 842.9% 异常涨粉来源，并通过日期筛选优化数据解读与决策效率。",
    ],
  },
];

const recentExperiences = recentFirst(experiences);
const recentResumeProjects = recentFirst(resumeProjects);

export const profile = {
  name: "AmierHan",
  birthDate: "2003-01-21",
  location: "杭州",
  desiredRole: "数据分析师",
  status: "研究生在读",
  title: "数据分析 · 商业智能 · 研究建模",
  statement: "把业务问题拆解为清晰指标，用可视化、实验与模型支持可执行决策。",
  avatarUrl,
  education: {
    school: "浙江财经大学",
    program: "大数据统计方法与应用 · 硕士在读",
    period: "2025.09 — 2028.06",
    gpa: "GPA 4.2 / 5",
    undergraduate: "数据科学与大数据技术 · 本科（GPA 4.0 / 5）",
  },
  experience: recentExperiences[0],
  experiences: recentExperiences,
  resumeDetails: {
    coursework: ["数据库原理与技术", "数学建模", "机器学习", "回归分析", "概率统计", "自然语言处理", "Linux 操作系统原理"],
    projects: recentResumeProjects,
  },
  awards: ["美赛 M 奖（全球前 6%）", "泰迪杯数据分析技能赛全国二等奖", "数学建模竞赛浙江省三等奖"],
  skillGroups: [
    { label: "分析", value: "SQL · Python · Pandas · NumPy · SciPy · Scikit-learn" },
    { label: "BI", value: "Tableau · Power BI · FineBI · Excel" },
    { label: "自动化", value: "RPA · DataWorks · Tableau Prep · Codex / Cursor" },
  ],
  contacts: [
    { label: "Email", value: "amierhan0121@163.com", href: "mailto:amierhan0121@163.com" },
    { label: "Phone", value: "188 5887 8167", href: "tel:18858878167" },
    { label: "Web", value: "www.amportfolio.top", href: "https://www.amportfolio.top" },
  ],
  capabilities: [
    {
      title: "业务诊断",
      detail: "从业务目标出发定义指标、观察异常并组织分析路径。",
      tools: ["SQL", "Excel"],
    },
    {
      title: "经营分析",
      detail: "搭建可阅读、可追踪的经营看板与业务监控视图。",
      tools: ["Power BI", "Tableau", "FineBI"],
    },
    {
      title: "实验与建模",
      detail: "结合实验评估、特征工程和预测方法完成研究表达。",
      tools: ["Python", "统计建模"],
    },
  ],
} as const;

export function getCurrentAge(today = new Date()) {
  const birthDate = new Date(`${profile.birthDate}T00:00:00`);
  let age = today.getFullYear() - birthDate.getFullYear();
  const beforeBirthday = today.getMonth() < birthDate.getMonth()
    || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}
