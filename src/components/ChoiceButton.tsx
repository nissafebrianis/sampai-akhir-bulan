import type { Choice } from "../types/simulation";

type ChoiceButtonProps = {
  choice: Choice;
  letter: string;
  isSelected: boolean;
  isDimmed: boolean;
  disabled: boolean;
  onSelect: (choice: Choice) => void;
};

export function ChoiceButton({
  choice,
  letter,
  isSelected,
  isDimmed,
  disabled,
  onSelect,
}: ChoiceButtonProps) {
  const className = [
    "choice-button",
    isSelected ? "is-selected" : "",
    isDimmed && !isSelected ? "is-dim" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={className}
      onClick={() => onSelect(choice)}
      disabled={disabled}
      aria-pressed={isSelected}
    >
      <span className="choice-letter" aria-hidden="true">
        {letter}
      </span>
      <span className="choice-text">{choice.text}</span>
    </button>
  );
}
