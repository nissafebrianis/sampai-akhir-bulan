type ProgressBarProps = {
  value: number;
};

export function ProgressBar({ value }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className="app-progressbar"
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progres simulasi"
    >
      <div
        className="app-progressbar-fill"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
