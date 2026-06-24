import { useMemo } from "react";
import type { Choice, Scenario } from "../types/simulation";
import { ChoiceButton } from "./ChoiceButton";
import { ModuleTag } from "./ModuleTag";

type ScenarioCardProps = {
  scenario: Scenario;
  index: number;
  total: number;
  selectedChoice: Choice | null;
  shuffleSeed: number;
  onSelect: (choice: Choice) => void;
  disabled: boolean;
};

const LETTERS = ["A", "B", "C", "D"];

export function ScenarioCard({
  scenario,
  index,
  total,
  selectedChoice,
  shuffleSeed,
  onSelect,
  disabled,
}: ScenarioCardProps) {
  const choices = useMemo(
    () => shuffleChoices(scenario.choices),
    [scenario.choices, scenario.id, shuffleSeed]
  );

  return (
    <article
      className="sim-scenario"
      aria-labelledby={`scenario-title-${scenario.id}`}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <ModuleTag label={scenario.moduleLabel} />
        <span className="muted" style={{ fontSize: "0.82rem" }}>
          Skenario {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>
      <h2 id={`scenario-title-${scenario.id}`} className="sim-scenario-title">
        {scenario.title}
      </h2>
      <p className="sim-scenario-situation">{scenario.situation}</p>
      <p className="sim-scenario-prompt">
        <span aria-hidden="true">Refleksi: </span>
        {scenario.reflectionPrompt}
      </p>
      <div className="sim-scenario-measures">
        <span>Mengukur</span>
        <strong>{scenario.measures}</strong>
      </div>
      <div className="choices" role="radiogroup" aria-label="Pilihan jawaban">
        {choices.map((choice, idx) => {
          const isSelected = selectedChoice?.id === choice.id;
          const isDimmed = selectedChoice !== null && !isSelected;
          return (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              letter={LETTERS[idx]}
              isSelected={isSelected}
              isDimmed={isDimmed}
              disabled={disabled}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </article>
  );
}

function shuffleChoices(choices: Choice[]): Choice[] {
  const seeded = [...choices];

  for (let i = seeded.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [seeded[i], seeded[j]] = [seeded[j], seeded[i]];
  }

  return seeded;
}
