export type PersonaId = "sma" | "mahasiswa";

export type VisibleStats = {
  money: number;
  mood: number;
  focus: number;
  relationship: number;
  targetProgress: number;
};

export type RiskKey =
  | "impulsivity"
  | "rewardSensitivity"
  | "lossChasing"
  | "illusionOfControl"
  | "peerPressure"
  | "emotionCoping"
  | "secrecy"
  | "functionalImpairment";

export type ProtectiveKey =
  | "budgeting"
  | "pauseAbility"
  | "helpSeeking"
  | "riskChecking"
  | "stoppingAbility";

export type RiskScores = Record<RiskKey, number>;
export type ProtectiveScores = Record<ProtectiveKey, number>;

export type Choice = {
  id: string;
  text: string;
  statEffects: Partial<VisibleStats>;
  riskEffects: Partial<Record<RiskKey, number>>;
  protectiveEffects: Partial<Record<ProtectiveKey, number>>;
  feedback: string;
  principle: string;
};

export type Scenario = {
  id: string;
  moduleLabel: string;
  title: string;
  situation: string;
  reflectionPrompt: string;
  measures: string;
  choices: Choice[];
};

export type Persona = {
  id: PersonaId;
  label: string;
  summary: string;
  context: string;
  startingMoney: number;
  targetMoney: number;
  startingStats: VisibleStats;
  dailyCosts: AutoExpense[];
};

export type AutoExpense = {
  day: number;
  amount: number;
  label: string;
};

export type RiskLevel = "rendah" | "sedang" | "tinggi";

export type ResultReportData = {
  riskRaw: number;
  protectiveRaw: number;
  adjustedRisk: number;
  level: RiskLevel;
  levelLabel: string;
  topPatterns: RiskPattern[];
  finalStats: VisibleStats;
  journey: { scenarioId: string; title: string; choiceId: string }[];
  strategies: string[];
};

export type RiskPattern = {
  key: RiskKey;
  score: number;
  title: string;
  description: string;
  strategy: string;
};
