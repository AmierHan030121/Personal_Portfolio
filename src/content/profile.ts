import avatarUrl from "../../assets/avatar-amierhan.jpg";

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
  experience: {
    company: "易成教育",
    role: "数据运营实习生",
    period: "2025.07 — 2025.09",
    highlights: [
      "处理年度 1 万+ 条学生课时、缴费与退款数据。",
      "将数据准确率从约 60% 提升至 99%+，人工整理时间减少 60%。",
      "建立财务备注标准化 SOP，人工误差降至 1% 以下。",
    ],
  },
  resumeDetails: {
    coursework: ["数据库原理与技术", "数学建模", "机器学习", "回归分析", "概率统计", "自然语言处理", "Linux 操作系统原理"],
    projects: [
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
    ],
  },
  awards: ["美赛 M 奖（全球前 6%）", "泰迪杯数据分析技能赛全国二等奖", "数学建模竞赛浙江省三等奖"],
  skillGroups: [
    { label: "分析", value: "SQL · Python · Pandas · NumPy · SciPy · Scikit-learn" },
    { label: "BI", value: "Tableau · Power BI · FineBI · Excel" },
    { label: "自动化", value: "RPA · DataWorks · Tableau Prep · Codex / Cursor" },
  ],
  contacts: [
    { label: "Email", value: "amierhan030121@gmail.com", href: "mailto:amierhan030121@gmail.com" },
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
