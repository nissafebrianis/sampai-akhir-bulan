import type { AutoExpense, Choice } from "../types/simulation";
import { describeStatChange, formatDelta } from "../utils/scoring";

type ConsequencePanelProps = {
  choice: Choice;
  onNext: () => void;
  isLast: boolean;
  autoExpenses: AutoExpense[];
};

export function ConsequencePanel({
  choice,
  onNext,
  isLast,
  autoExpenses,
}: ConsequencePanelProps) {
  const changes = describeStatChange(choice);
  return (
    <section
      className="consequence"
      role="region"
      aria-live="polite"
      aria-label="Konsekuensi pilihan"
    >
      <span className="consequence-eyebrow">Refleksi</span>
      <p className="consequence-feedback">{choice.feedback}</p>

      {changes.length > 0 ? (
        <div className="consequence-changes">
          {changes.map((change) => {
            const positive = change.value.startsWith("+");
            const cls = positive
              ? "stat-pill is-positive"
              : change.value.startsWith("-")
              ? "stat-pill is-negative"
              : "stat-pill";
            return (
              <span key={change.label} className={cls}>
                <span className="stat-pill-label">{change.label}</span>
                <span className="stat-pill-value">{change.value}</span>
              </span>
            );
          })}
        </div>
      ) : null}

      {autoExpenses.length > 0 ? (
        <div className="auto-expenses">
          <span className="auto-expenses-label">Pengeluaran otomatis hari ini</span>
          {autoExpenses.map((expense) => (
            <div key={expense.label} className="auto-expense-row">
              <span>{expense.label}</span>
              <span className="stat-pill is-negative">
                <span className="stat-pill-value">{formatDelta(-expense.amount)}</span>
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="consequence-principle">
        <span className="consequence-principle-label">Catatan singkat</span>
        {choice.principle}
      </div>

      <div className="consequence-actions" style={{ marginTop: 18 }}>
        <button type="button" className="btn btn-primary" onClick={onNext}>
          {isLast ? "Lihat refleksi" : "Lanjut"}
        </button>
      </div>
    </section>
  );
}
