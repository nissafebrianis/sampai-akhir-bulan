import type { ReactNode } from "react";
import { ProgressBar } from "./ProgressBar";

type AppShellProps = {
  progress: number;
  progressLabel?: string;
  children: ReactNode;
};

export function AppShell({ progress, progressLabel, children }: AppShellProps) {
  return (
    <div className="app-shell" id="top">
      <header className="app-topbar">
        <div className="app-topbar-inner">
          <div className="app-brand">
            <span className="app-brand-mark" aria-hidden="true">
              SA
            </span>
            <span>Sampai Akhir Bulan</span>
          </div>
          {progressLabel ? (
            <div className="app-meta" aria-live="polite">
              {progressLabel}
            </div>
          ) : null}
        </div>
        <ProgressBar value={progress} />
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        Sampai Akhir Bulan / latihan refleksi keputusan finansial / bukan alat
        diagnosis
      </footer>
    </div>
  );
}
