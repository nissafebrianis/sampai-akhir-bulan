import type {
  Choice,
  ProtectiveKey,
  ProtectiveScores,
  ResultReportData,
  RiskKey,
  RiskLevel,
  RiskPattern,
  RiskScores,
  VisibleStats,
} from "../types/simulation";

export const RISK_KEYS: RiskKey[] = [
  "impulsivity",
  "rewardSensitivity",
  "lossChasing",
  "illusionOfControl",
  "peerPressure",
  "emotionCoping",
  "secrecy",
  "functionalImpairment",
];

export const PROTECTIVE_KEYS: ProtectiveKey[] = [
  "budgeting",
  "pauseAbility",
  "helpSeeking",
  "riskChecking",
  "stoppingAbility",
];

export function emptyRiskScores(): RiskScores {
  return RISK_KEYS.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as RiskScores);
}

export function emptyProtectiveScores(): ProtectiveScores {
  return PROTECTIVE_KEYS.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as ProtectiveScores);
}

export function clampStat(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function clampStats(stats: VisibleStats): VisibleStats {
  return {
    money: stats.money,
    mood: clampStat(stats.mood, 0, 100),
    focus: clampStat(stats.focus, 0, 100),
    relationship: clampStat(stats.relationship, 0, 100),
    targetProgress: clampStat(stats.targetProgress, 0, 100),
  };
}

export function formatRupiah(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.abs(Math.round(amount));
  const formatted = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${isNegative ? "-" : ""}Rp ${formatted}`;
}

export function formatDelta(amount: number): string {
  if (amount === 0) return "0";
  const sign = amount > 0 ? "+" : "-";
  const abs = Math.abs(Math.round(amount));
  const formatted = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${sign}Rp ${formatted}`;
}

export function formatSignedNumber(value: number, suffix = ""): string {
  if (value === 0) return `0${suffix}`;
  const sign = value > 0 ? "+" : "-";
  return `${sign}${Math.abs(value)}${suffix}`;
}

export function applyChoiceEffects(
  stats: VisibleStats,
  choice: Choice
): VisibleStats {
  const next: VisibleStats = { ...stats };

  if (typeof choice.statEffects.money === "number") {
    next.money = stats.money + (choice.statEffects.money ?? 0);
  }
  if (typeof choice.statEffects.mood === "number") {
    next.mood = stats.mood + (choice.statEffects.mood ?? 0);
  }
  if (typeof choice.statEffects.focus === "number") {
    next.focus = stats.focus + (choice.statEffects.focus ?? 0);
  }
  if (typeof choice.statEffects.relationship === "number") {
    next.relationship =
      stats.relationship + (choice.statEffects.relationship ?? 0);
  }
  if (typeof choice.statEffects.targetProgress === "number") {
    next.targetProgress =
      stats.targetProgress + (choice.statEffects.targetProgress ?? 0);
  }

  return clampStats(next);
}

export function addRiskScores(
  current: RiskScores,
  effects: Partial<Record<RiskKey, number>>
): RiskScores {
  const next = { ...current };
  for (const key of RISK_KEYS) {
    if (typeof effects[key] === "number") {
      next[key] = Math.max(0, current[key] + (effects[key] ?? 0));
    }
  }
  return next;
}

export function addProtectiveScores(
  current: ProtectiveScores,
  effects: Partial<Record<ProtectiveKey, number>>
): ProtectiveScores {
  const next = { ...current };
  for (const key of PROTECTIVE_KEYS) {
    if (typeof effects[key] === "number") {
      next[key] = Math.max(0, current[key] + (effects[key] ?? 0));
    }
  }
  return next;
}

export const RISK_PROFILES: Record<
  RiskKey,
  { title: string; description: string; strategy: string }
> = {
  impulsivity: {
    title: "Pola Cepat Ambil Keputusan",
    description:
      "Kamu cenderung memilih aksi cepat sebelum sempat mengecek informasi atau konsekuensinya.",
    strategy:
      "Pakai aturan jeda 10 menit sebelum keputusan yang melibatkan uang.",
  },
  rewardSensitivity: {
    title: "Pola Tertarik Hadiah",
    description:
      "Tawaran yang terlihat menguntungkan cukup kuat untuk menggerakkan keputusanmu, walau risikonya belum jelas.",
    strategy:
      "Tanya dulu: 'Kalau tidak ada bonus, aku masih mau ambil keputusan ini?'",
  },
  lossChasing: {
    title: "Pola Mengejar Kerugian",
    description:
      "Saat ada kerugian, kamu cenderung ingin segera memperbaikinya dengan keputusan baru.",
    strategy:
      "Tentukan batas rugi kecil dan berhenti dulu saat emosi sedang naik.",
  },
  illusionOfControl: {
    title: "Pola Terlalu Percaya Feeling",
    description:
      "Kamu mudah merasa sudah melihat pola, padahal informasinya belum cukup.",
    strategy:
      "Cari data, cek risiko, dan jangan menaikkan komitmen hanya karena feeling.",
  },
  peerPressure: {
    title: "Pola Terbawa Ajakan",
    description:
      "Keputusanmu cukup dipengaruhi oleh momentum sosial, ajakan teman, atau rasa takut ketinggalan.",
    strategy:
      "Latih kalimat penunda: 'Aku cek budget dulu, nanti aku kabari.'",
  },
  emotionCoping: {
    title: "Pola Keputusan Saat Emosi Penuh",
    description:
      "Saat stres atau kecewa, kamu lebih mudah memilih keputusan finansial yang memberi rasa lega cepat.",
    strategy:
      "Pisahkan emosi dan uang: tunda keputusan finansial saat mood sedang turun.",
  },
  secrecy: {
    title: "Pola Menyimpan Sendiri",
    description:
      "Saat keputusan kurang enak, kamu cenderung menyimpannya sendiri.",
    strategy:
      "Pilih satu orang aman untuk diajak bicara saat keputusan uang mulai terasa berat.",
  },
  functionalImpairment: {
    title: "Pola Tanggung Jawab Lain Terabaikan",
    description:
      "Mengejar atau memikirkan uang kadang membuat tugas, belajar, atau peran lainmu ikut terlambat.",
    strategy:
      "Tetapkan waktu khusus untuk urusan uang agar tidak mencuri waktu dari hal penting lain.",
  },
};

export function getRiskLevel(adjustedRisk: number): {
  level: RiskLevel;
  label: string;
  blurb: string;
} {
  if (adjustedRisk <= 8) {
    return {
      level: "rendah",
      label: "Risiko Rendah",
      blurb:
        "Pola keputusanmu cenderung tenang dan terukur. Pertahankan ritme ini sambil terus latihan.",
    };
  }
  if (adjustedRisk <= 18) {
    return {
      level: "sedang",
      label: "Risiko Sedang",
      blurb:
        "Ada beberapa momen saat keputusanmu bergeser ketika emosi, ajakan, atau tekanan naik. Area ini layak dilatih.",
    };
  }
  return {
    level: "tinggi",
    label: "Risiko Tinggi",
    blurb:
      "Dalam simulasi ini, pola keputusanmu cukup sering mengikuti dorongan sesaat. Mulai dari strategi kecil yang konsisten.",
  };
}

export function getTopRiskPatterns(
  risk: RiskScores,
  limit = 3
): RiskPattern[] {
  const sorted = RISK_KEYS.map((key) => ({
    key,
    score: risk[key] ?? 0,
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  const top = sorted.slice(0, limit);
  return top.map((entry) => {
    const profile = RISK_PROFILES[entry.key];
    return {
      key: entry.key,
      score: entry.score,
      title: profile.title,
      description: profile.description,
      strategy: profile.strategy,
    };
  });
}

export function buildResult(args: {
  risk: RiskScores;
  protective: ProtectiveScores;
  finalStats: VisibleStats;
  journey: { scenarioId: string; title: string; choiceId: string }[];
  targetMoney: number;
}): ResultReportData {
  const riskRaw = RISK_KEYS.reduce((sum, key) => sum + (args.risk[key] ?? 0), 0);
  const protectiveRaw = PROTECTIVE_KEYS.reduce(
    (sum, key) => sum + (args.protective[key] ?? 0),
    0
  );

  const moneyDeficit = Math.max(0, args.targetMoney - args.finalStats.money);
  const moneyPenalty = Math.round(moneyDeficit / 10000) * 1.5;

  const adjustedRisk = Math.max(0, riskRaw + moneyPenalty - protectiveRaw * 0.55);
  const level = getRiskLevel(adjustedRisk);
  const topPatterns = getTopRiskPatterns(args.risk, 3);
  const strategies = topPatterns.map((p) => p.strategy);
  while (strategies.length < 3) {
    strategies.push(
      "Buat jeda 10 menit sebelum keputusan finansial apa pun, sekecil apa pun nominalnya."
    );
  }

  return {
    riskRaw,
    protectiveRaw,
    adjustedRisk: Math.round(adjustedRisk * 10) / 10,
    level: level.level,
    levelLabel: level.label,
    topPatterns,
    finalStats: args.finalStats,
    journey: args.journey,
    strategies,
  };
}

export function describeStatChange(
  choice: Choice
): { label: string; value: string }[] {
  const result: { label: string; value: string }[] = [];
  const map: Record<keyof VisibleStats, string> = {
    money: "Saldo",
    mood: "Mood",
    focus: "Fokus",
    relationship: "Relasi",
    targetProgress: "Target",
  };

  (Object.keys(choice.statEffects) as (keyof VisibleStats)[]).forEach(
    (key) => {
      const value = choice.statEffects[key];
      if (typeof value === "number" && value !== 0) {
        if (key === "money") {
          result.push({ label: map[key], value: formatDelta(value) });
        } else {
          result.push({
            label: map[key],
            value: formatSignedNumber(value),
          });
        }
      }
    }
  );

  return result;
}
