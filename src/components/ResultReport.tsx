import { SCENARIOS } from "../data/scenarios";
import type {
  Choice,
  ResultReportData,
  RiskScores,
} from "../types/simulation";
import { formatRupiah, RISK_KEYS } from "../utils/scoring";
import { ModuleTag } from "./ModuleTag";

type ResultReportProps = {
  result: ResultReportData;
  risk: RiskScores;
  onRestart: () => void;
};

export function ResultReport({ result, risk, onRestart }: ResultReportProps) {
  return (
    <div className="result" aria-live="polite">
      <header className="result-header">
        <ModuleTag label="Modul 11 / Refleksi" />
        <h1 className="result-title">Pola Keputusan Finansialmu</h1>
        <p className="muted" style={{ maxWidth: "60ch", margin: 0 }}>
          Ini bukan diagnosis. Anggap saja ini catatan awal dari pola pilihan
          yang kamu ambil selama simulasi.
        </p>
      </header>

      <section className="result-risk" aria-label="Tingkat risiko">
        <div className={`result-risk-badge level-${result.level}`}>
          <div>
            <div className="result-risk-label">Tingkat</div>
            <div className="result-risk-score">
              {result.adjustedRisk.toFixed(1)}
            </div>
          </div>
        </div>
        <div>
          <div className="result-risk-text-label">Gambaran singkat</div>
          <h2 className="result-risk-text-title">{result.levelLabel}</h2>
          <p className="result-risk-text-blurb">{getBlurb(result.level)}</p>
          <p className="muted" style={{ fontSize: "0.85rem", marginTop: 12 }}>
            Skor mentah: risiko {result.riskRaw} / protektif {result.protectiveRaw}.
            Skor disesuaikan menimbang pola pilihanmu dan seberapa sering kamu
            juga memakai strategi yang melindungi diri.
          </p>
        </div>
      </section>

      <section className="result-section" aria-label="Pola terkuat">
        <h2 className="result-section-title">Pola yang paling terasa</h2>
        {result.topPatterns.length === 0 ? (
          <p className="muted">
            Belum ada pola risiko yang benar-benar menonjol. Cara kamu mengambil
            keputusan terlihat cukup tenang dan terukur.
          </p>
        ) : (
          <div className="pattern-list">
            {result.topPatterns.map((pattern, idx) => (
              <article key={pattern.key} className="pattern-card">
                <div>
                  <h3>
                    <span style={{ color: "var(--muted)", marginRight: 8 }}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {pattern.title}
                  </h3>
                  <p>{pattern.description}</p>
                  <div className="pattern-strategy">
                    <strong>Strategi:</strong> {pattern.strategy}
                  </div>
                </div>
                <div className="pattern-score" aria-hidden="true">
                  {pattern.score}
                  <span className="pattern-score-label">Skor</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="result-section" aria-label="Strategi pribadi">
        <h2 className="result-section-title">3 strategi yang bisa dicoba</h2>
        <div className="strategy-list">
          {result.strategies.slice(0, 3).map((strategy, idx) => (
            <div key={idx} className="strategy-item">
              <span className="strategy-item-num">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <p>{strategy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="result-section" aria-label="Statistik akhir">
        <h2 className="result-section-title">Statistik di akhir simulasi</h2>
        <div className="result-stats">
          <StatRow label="Saldo" value={formatRupiah(result.finalStats.money)} />
          <StatRow label="Mood" value={`${result.finalStats.mood} / 100`} />
          <StatRow label="Fokus" value={`${result.finalStats.focus} / 100`} />
          <StatRow
            label="Relasi"
            value={`${result.finalStats.relationship} / 100`}
          />
          <StatRow
            label="Target"
            value={`${result.finalStats.targetProgress} / 100`}
          />
        </div>
      </section>

      <section className="result-section" aria-label="Peta perjalanan">
        <h2 className="result-section-title">Jejak 10 skenario</h2>
        <p className="muted" style={{ fontSize: "0.9rem", marginTop: -8 }}>
          Setiap kotak mewakili satu skenario. Warna menunjukkan seberapa kuat
          dorongan risiko pada momen itu.
        </p>
        <div className="journey-strip" style={{ marginTop: 16 }}>
          {result.journey.map((entry, idx) => {
            const scenario = SCENARIOS.find((s) => s.id === entry.scenarioId);
            const choice = scenario?.choices.find((c) => c.id === entry.choiceId);
            const intensity = getChoiceIntensity(choice);
            const cls =
              intensity === "risky"
                ? "journey-cell is-risky"
                : intensity === "protective"
                ? "journey-cell is-protective"
                : "journey-cell is-balanced";
            return (
              <div
                key={`${entry.scenarioId}-${idx}`}
                className={cls}
                title={`Skenario ${idx + 1}: ${entry.title}`}
                aria-label={`Skenario ${idx + 1} ${entry.title}`}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>
            );
          })}
        </div>
      </section>

      <section className="result-section" aria-label="Catatan pribadi">
        <h2 className="result-section-title">Catatan refleksi</h2>
        <p style={{ margin: 0 }}>
          Yang paling layak dijaga adalah pola yang paling sering muncul saat
          kamu sedang tertekan, capek, atau terdorong ikut arus. Mulai dari
          jeda kecil, lalu ulangi sampai terasa wajar.
        </p>
      </section>

      <section className="result-section" aria-label="Disclaimer">
        <div className="result-disclaimer">
          <span className="result-disclaimer-label">Disclaimer</span>
          Ini bukan alat diagnosis. Hasil simulasi hanya untuk refleksi awal
          tentang pola keputusan finansial. Kalau kamu merasa urusan uang mulai
          terasa berat atau susah dikendalikan, ada baiknya bicara dengan orang
          yang kamu percaya, konselor, atau profesional.
        </div>
      </section>

      <div className="result-actions">
        <button type="button" className="btn btn-primary" onClick={onRestart}>
          Mulai lagi
        </button>
        <a
          className="btn btn-ghost"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Kembali ke atas
        </a>
      </div>

      <span className="sr-only" aria-hidden="true">
        {RISK_KEYS.map((key) => `${key} ${risk[key]}`).join(" ")}
      </span>
    </div>
  );
}

function getBlurb(level: ResultReportData["level"]): string {
  switch (level) {
    case "rendah":
      return "Dalam simulasi ini, pola keputusanmu cenderung tenang dan terukur. Kebiasaan cek, jeda, dan cerita yang sudah ada layak dipertahankan.";
    case "sedang":
      return "Ada beberapa momen saat dorongan sesaat terasa cukup kuat. Biasanya, bagian yang perlu dijaga ada di emosi dan tekanan sosial. Perbaikan kecil pun bisa terasa cukup cepat.";
    case "tinggi":
    default:
      return "Dalam simulasi ini, pola keputusanmu cukup sering mengikuti dorongan sesaat. Bagian yang paling perlu dijaga ada di dorongan emosional dan kebiasaan mencari jalan pintas. Mulai dari satu strategi yang paling masuk akal buatmu.";
  }
}

type Intensity = "risky" | "protective" | "balanced";

function getChoiceIntensity(choice: Choice | undefined): Intensity {
  if (!choice) return "balanced";
  const risk = Object.values(choice.riskEffects).reduce<number>(
    (sum, value) => sum + (value ?? 0),
    0
  );
  const protective = Object.values(choice.protectiveEffects).reduce<number>(
    (sum, value) => sum + (value ?? 0),
    0
  );
  if (risk >= 3 && protective <= 0) return "risky";
  if (protective >= 2 && risk <= 0) return "protective";
  if (risk > protective) return "risky";
  if (protective > risk) return "protective";
  return "balanced";
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="dashboard-row"
      style={{
        padding: "12px 0",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="dashboard-row-label"
        style={{ flex: "0 0 120px", textAlign: "left" }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          fontFamily: "var(--font-serif)",
          fontSize: "1.05rem",
          color: "var(--ink)",
          textAlign: "right",
        }}
      >
        {value}
      </div>
    </div>
  );
}
