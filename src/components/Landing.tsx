import { ModuleTag } from "./ModuleTag";

type LandingProps = {
  onStart: () => void;
};

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="landing-eyebrow">
          <ModuleTag label="Modul 00 / Pembuka" />
          <ModuleTag label="Refleksi / Bukan diagnosis" variant="muted" />
        </div>
        <h1 className="landing-title">
          Sampai <em>Akhir Bulan</em>
        </h1>
        <p className="landing-subtitle">
          Latihan singkat untuk melihat bagaimana kamu mengambil keputusan saat
          uang, tekanan sosial, dan emosi datang bareng.
        </p>
        <div className="landing-cta-row">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onStart}
            autoFocus
          >
            Mulai simulasi
          </button>
          <span className="muted" style={{ fontSize: "0.9rem" }}>
            Sekitar 7 menit / 10 skenario / anonim
          </span>
        </div>
        <div className="landing-stats" aria-label="Ringkasan simulasi">
          <div className="landing-stat">
            <div className="landing-stat-num">10</div>
            <div className="landing-stat-label">Skenario</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-num">2</div>
            <div className="landing-stat-label">Persona</div>
          </div>
          <div className="landing-stat">
            <div className="landing-stat-num">~7</div>
            <div className="landing-stat-label">Menit</div>
          </div>
        </div>
        <div
          className="landing-disclaimer"
          role="note"
          style={{ marginTop: 24 }}
        >
          <span className="landing-disclaimer-label">Penting</span>
          <p style={{ margin: 0 }}>
            Ini bukan alat diagnosis. Hasil simulasi hanya jadi bahan refleksi
            awal soal pola keputusan finansial. Kalau kamu merasa urusan uang
            mulai sulit dikendalikan, ada baiknya bicara dengan orang yang kamu
            percaya, konselor, atau tenaga profesional.
          </p>
        </div>
      </section>

      <aside className="landing-preview" aria-hidden="true">
        <span className="landing-preview-tag">Preview modul 01</span>
        <h2 className="landing-preview-title">
          Pilih persona, lalu kelola uang, mood, dan fokusmu sampai akhir bulan.
        </h2>
        <div className="landing-preview-stats">
          <div className="landing-preview-stat">
            <div className="landing-preview-stat-label">Saldo</div>
            <div className="landing-preview-stat-value">Rp 250.000</div>
          </div>
          <div className="landing-preview-stat">
            <div className="landing-preview-stat-label">Mood</div>
            <div className="landing-preview-stat-value">70 / 100</div>
          </div>
          <div className="landing-preview-stat">
            <div className="landing-preview-stat-label">Fokus</div>
            <div className="landing-preview-stat-value">70 / 100</div>
          </div>
          <div className="landing-preview-stat">
            <div className="landing-preview-stat-label">Relasi</div>
            <div className="landing-preview-stat-value">70 / 100</div>
          </div>
        </div>
        <p className="muted" style={{ fontSize: "0.9rem", margin: 0 }}>
          Setiap pilihan akan mengubah angka yang kamu lihat, lalu pelan-pelan
          membentuk pola yang lebih dalam di belakangnya.
        </p>
      </aside>
    </div>
  );
}
