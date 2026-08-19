import ecommerceDashboard from "../../作品/AI增强的电商增长分析与实验决策看板.png";
import bilibiliDashboardOne from "../../作品/B站up主数据监控看板_1.png";
import bilibiliDashboardTwo from "../../作品/B站up主数据监控看板_2.png";
import k12Preview from "../../assets/previews/k12线上教育Power BI经营分析看板.png";
import k12Pdf from "../../作品/k12线上教育Power BI经营分析看板.pdf";
import logisticsPreview from "../../assets/previews/国际物流结算计费系统监控.png";
import logisticsPdf from "../../作品/国际物流结算计费系统监控.pdf";
import sailboatPreview from "../../assets/previews/二手帆船市场定价模型研究.png";
import sailboatPdf from "../../作品/二手帆船市场定价模型研究.pdf";
import regionalPreview from "../../assets/previews/省域研发投入与高质量知识产权转化差异识别及预测（Codex Agent 协同）.png";
import regionalPdf from "../../作品/省域研发投入与高质量知识产权转化差异识别及预测（Codex Agent 协同）.pdf";

export type ProjectKind = "dashboard" | "research";
export type MediaKind = "image" | "gallery" | "pdf";

export interface ProjectMedia {
  kind: MediaKind;
  src: string;
  preview?: string;
  alt: string;
  label: string;
  gallery?: Array<{ src: string; alt: string }>;
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  kind: ProjectKind;
  summary: string;
  question: string;
  capabilities: string[];
  tools: string[];
  media: ProjectMedia[];
  featured?: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    slug: "ai-ecommerce-growth",
    title: "AI 增强的电商增长分析与实验决策看板",
    shortTitle: "电商增长与实验",
    kind: "dashboard",
    summary: "构建增长分析视图，结合 GMV 诊断、RFM 分层、A/B 实验结果与异常检测形成策略建议。",
    question: "围绕电商增长漏斗、用户分层与实验决策组织分析视图。",
    capabilities: ["增长分析", "实验评估", "用户分层"],
    tools: ["Python", "SQL", "Excel", "HTML BI"],
    media: [
      {
        kind: "image",
        src: ecommerceDashboard,
        alt: "AI 增强的电商增长分析与实验决策看板全图",
        label: "看板全图",
      },
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "bilibili-creator-monitoring",
    title: "B站 UP 主数据监控看板",
    shortTitle: "B站 UP 主监控",
    kind: "dashboard",
    summary: "聚焦日增粉、掉粉、粉丝来源与视频趋势，联动观察内容表现与粉丝结构变化。",
    question: "以内容运营视角观察粉丝增长、来源结构和视频生命周期。",
    capabilities: ["内容运营", "增长分析", "趋势监控"],
    tools: ["Tableau", "可视分析"],
    media: [
      {
        kind: "gallery",
        src: bilibiliDashboardOne,
        preview: bilibiliDashboardOne,
        alt: "B站 UP 主数据监控看板主页面",
        label: "双页看板",
        gallery: [
          { src: bilibiliDashboardOne, alt: "B站 UP 主数据监控看板主页面" },
          { src: bilibiliDashboardTwo, alt: "B站 UP 主数据监控看板明细页面" },
        ],
      },
    ],
    featured: true,
    order: 2,
  },
  {
    slug: "k12-power-bi-operations",
    title: "K12 线上教育 Power BI 经营分析看板",
    shortTitle: "K12 经营分析",
    kind: "dashboard",
    summary: "围绕经营指标、学员转化与课程表现搭建多层级经营分析视图。",
    question: "以经营分析视角组织核心指标、转化过程与课程表现。",
    capabilities: ["经营分析", "教育行业", "指标体系"],
    tools: ["Power BI"],
    media: [
      {
        kind: "pdf",
        src: k12Pdf,
        preview: k12Preview,
        alt: "K12 线上教育 Power BI 经营分析看板预览",
        label: "PDF 看板",
      },
    ],
    order: 3,
  },
  {
    slug: "international-logistics-settlement",
    title: "国际物流结算计费系统监控",
    shortTitle: "物流结算监控",
    kind: "dashboard",
    summary: "覆盖结算计费链路核心监控，聚焦异常识别、指标追踪与结算过程透明化。",
    question: "围绕物流结算计费链路组织监控指标与异常观察。",
    capabilities: ["流程监控", "异常识别", "物流结算"],
    tools: ["FineBI"],
    media: [
      {
        kind: "pdf",
        src: logisticsPdf,
        preview: logisticsPreview,
        alt: "国际物流结算计费系统监控看板预览",
        label: "PDF 看板",
      },
    ],
    order: 4,
  },
  {
    slug: "used-sailboat-pricing",
    title: "二手帆船市场定价模型研究",
    shortTitle: "二手帆船定价研究",
    kind: "research",
    summary: "使用结构化特征与建模方法识别价格驱动因素，为二手帆船市场定价提供量化分析。",
    question: "围绕二手帆船市场定价与价格驱动因素开展研究。",
    capabilities: ["回归建模", "特征工程", "价格预测"],
    tools: ["Python", "统计建模"],
    media: [
      {
        kind: "pdf",
        src: sailboatPdf,
        preview: sailboatPreview,
        alt: "二手帆船市场定价模型研究论文首页",
        label: "研究 PDF",
      },
    ],
    featured: true,
    order: 5,
  },
  {
    slug: "regional-rd-ip-conversion",
    title: "省域研发投入与高质量知识产权转化差异识别及预测",
    shortTitle: "省域研发与知识产权转化",
    kind: "research",
    summary: "分析省域研发投入与高质量知识产权转化差异，并构建预测逻辑与协同优化建议。",
    question: "围绕省域研发投入与高质量知识产权转化差异开展识别与预测。",
    capabilities: ["区域分析", "预测建模", "政策研究"],
    tools: ["Python", "Codex Agent"],
    media: [
      {
        kind: "pdf",
        src: regionalPdf,
        preview: regionalPreview,
        alt: "省域研发投入与高质量知识产权转化差异识别及预测论文首页",
        label: "研究 PDF",
      },
    ],
    order: 6,
  },
];

export const orderedProjects = [...projects].sort((a, b) => a.order - b.order);
export const featuredProjects = orderedProjects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
