import avatarUrl from "../../assets/avatar-amierhan.jpg";

export const profile = {
  name: "AmierHan",
  title: "数据分析 · 商业智能 · 研究建模",
  statement: "把业务问题拆解为清晰指标，用可视化、实验与模型支持可执行决策。",
  avatarUrl,
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
