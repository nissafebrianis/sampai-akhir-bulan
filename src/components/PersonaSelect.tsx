import { PERSONAS } from "../data/personas";
import type { Persona, PersonaId } from "../types/simulation";
import { formatRupiah } from "../utils/scoring";
import { ModuleTag } from "./ModuleTag";

type PersonaSelectProps = {
  selected: PersonaId | null;
  onSelect: (id: PersonaId) => void;
  onConfirm: () => void;
  onBack: () => void;
};

const LETTERS = ["A", "B"];

export function PersonaSelect({
  selected,
  onSelect,
  onConfirm,
  onBack,
}: PersonaSelectProps) {
  return (
    <div className="stack">
      <div>
        <ModuleTag label="Modul 01 / Pilih persona" />
        <h2 style={{ marginTop: 12 }}>
          Mulai dari posisi yang paling dekat denganmu.
        </h2>
        <p className="muted" style={{ maxWidth: "60ch" }}>
          Setiap persona membawa saldo, target, dan konteks yang berbeda. Tidak
          ada jawaban benar atau salah di sini, hanya titik awal yang berbeda.
        </p>
      </div>

      <div className="persona-grid" role="radiogroup" aria-label="Pilih persona">
        {PERSONAS.map((persona, idx) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            letter={LETTERS[idx]}
            isActive={selected === persona.id}
            onClick={() => onSelect(persona.id)}
          />
        ))}
      </div>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          Kembali
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onConfirm}
          disabled={!selected}
        >
          Lanjut ke simulasi
        </button>
      </div>
    </div>
  );
}

type PersonaCardProps = {
  persona: Persona;
  letter: string;
  isActive: boolean;
  onClick: () => void;
};

function PersonaCard({ persona, letter, isActive, onClick }: PersonaCardProps) {
  return (
    <button
      type="button"
      className="persona-card"
      role="radio"
      aria-checked={isActive}
      aria-pressed={isActive}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="choice-letter" aria-hidden="true">
          {letter}
        </span>
        <span
          className="muted"
          style={{
            fontSize: "0.78rem",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          {persona.summary}
        </span>
      </div>
      <h3 className="persona-card-title">{persona.label}</h3>
      <p className="persona-card-context">{persona.context}</p>
      <div className="persona-card-numbers">
        <div className="persona-card-number">
          <div className="persona-card-number-label">Saldo awal</div>
          <div className="persona-card-number-value">
            {formatRupiah(persona.startingMoney)}
          </div>
        </div>
        <div className="persona-card-number">
          <div className="persona-card-number-label">Target</div>
          <div className="persona-card-number-value">
            {formatRupiah(persona.targetMoney)}
          </div>
        </div>
      </div>
    </button>
  );
}
