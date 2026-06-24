import type { Persona, VisibleStats } from "../types/simulation";
import { formatRupiah } from "../utils/scoring";

type StatDashboardProps = {
  persona: Persona;
  stats: VisibleStats;
};

const labels: { key: keyof VisibleStats; label: string; suffix?: string }[] = [
  { key: "money", label: "Saldo" },
  { key: "mood", label: "Mood" },
  { key: "focus", label: "Fokus" },
  { key: "relationship", label: "Relasi" },
  { key: "targetProgress", label: "Target" },
];

export function StatDashboard({ persona, stats }: StatDashboardProps) {
  return (
    <aside className="dashboard" aria-label="Statistik saat ini">
      <div className="dashboard-title">
        <span>Statistik</span>
        <span className="dashboard-persona">{persona.label}</span>
      </div>
      {labels.map((item) => {
        if (item.key === "money") {
          const isNegative = stats.money < 0;
          const target = persona.targetMoney;
          const starting = persona.startingMoney;
          const range = starting - target;
          const ratio = range > 0 ? 1 - (stats.money - target) / range : 0;
          const fillPercent = Math.max(0, Math.min(100, ratio * 100));
          return (
            <div key="money" className="dashboard-row is-money">
              <div className="dashboard-row-label">{item.label}</div>
              <div
                className={`money-amount ${isNegative ? "is-warn" : ""}`}
                aria-live="polite"
              >
                {formatRupiah(stats.money)}
              </div>
              <div className="money-target">
                Target akhir: {formatRupiah(persona.targetMoney)}
              </div>
              <div
                className="dashboard-row-bar"
                aria-hidden="true"
                title="Jarak menuju target"
              >
                <div
                  className={`dashboard-row-bar-fill ${
                    isNegative ? "is-warn" : ""
                  }`}
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
            </div>
          );
        }
        const value = stats[item.key] as number;
        return (
          <div key={item.key} className="dashboard-row">
            <div className="dashboard-row-label">{item.label}</div>
            <div
              className="dashboard-row-bar"
              role="progressbar"
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${item.label}: ${value} dari 100`}
            >
              <div
                className="dashboard-row-bar-fill"
                style={{ width: `${value}%` }}
              />
            </div>
            <div className="dashboard-row-value">{value}</div>
          </div>
        );
      })}
    </aside>
  );
}
