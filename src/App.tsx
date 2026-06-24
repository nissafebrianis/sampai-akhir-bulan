import { useEffect, useMemo, useReducer } from "react";
import { AppShell } from "./components/AppShell";
import { ConsequencePanel } from "./components/ConsequencePanel";
import { Landing } from "./components/Landing";
import { PersonaSelect } from "./components/PersonaSelect";
import { ResultReport } from "./components/ResultReport";
import { ScenarioCard } from "./components/ScenarioCard";
import { StatDashboard } from "./components/StatDashboard";
import { SCENARIOS, getScenarioByIndex } from "./data/scenarios";
import { getPersona, PERSONAS } from "./data/personas";
import type {
  AutoExpense,
  Choice,
  PersonaId,
  ProtectiveScores,
  RiskScores,
  VisibleStats,
} from "./types/simulation";
import {
  addProtectiveScores,
  addRiskScores,
  applyChoiceEffects,
  buildResult,
  clampStats,
  emptyProtectiveScores,
  emptyRiskScores,
} from "./utils/scoring";

type Screen = "landing" | "persona" | "simulation" | "result";

type JourneyEntry = {
  scenarioId: string;
  title: string;
  choiceId: string;
};

type State = {
  screen: Screen;
  personaId: PersonaId | null;
  stats: VisibleStats;
  risk: RiskScores;
  protective: ProtectiveScores;
  scenarioIndex: number;
  selectedChoice: Choice | null;
  journey: JourneyEntry[];
  shuffleSeed: number;
  autoExpensesApplied: AutoExpense[];
};

type Action =
  | { type: "go-to-persona" }
  | { type: "go-to-landing" }
  | { type: "set-persona"; id: PersonaId }
  | { type: "start-simulation" }
  | { type: "select-choice"; choice: Choice }
  | { type: "advance-scenario" }
  | { type: "restart" };

function getInitialStats(personaId: PersonaId): VisibleStats {
  const persona = getPersona(personaId);
  return clampStats({ ...persona.startingStats });
}

function createShuffleSeed(): number {
  return Math.floor(Math.random() * 1_000_000_000);
}

const initialState: State = {
  screen: "landing",
  personaId: null,
  stats: clampStats({ ...PERSONAS[0].startingStats }),
  risk: emptyRiskScores(),
  protective: emptyProtectiveScores(),
  scenarioIndex: 0,
  selectedChoice: null,
  journey: [],
  shuffleSeed: createShuffleSeed(),
  autoExpensesApplied: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "go-to-persona":
      return { ...state, screen: "persona" };

    case "go-to-landing":
      return {
        ...initialState,
        stats: clampStats({ ...PERSONAS[0].startingStats }),
        shuffleSeed: createShuffleSeed(),
      };

    case "set-persona":
      return {
        ...state,
        personaId: action.id,
        stats: getInitialStats(action.id),
      };

    case "start-simulation":
      if (!state.personaId) return state;
      return {
        ...state,
        screen: "simulation",
        stats: getInitialStats(state.personaId),
        risk: emptyRiskScores(),
        protective: emptyProtectiveScores(),
        scenarioIndex: 0,
        selectedChoice: null,
        journey: [],
        shuffleSeed: createShuffleSeed(),
      };

    case "select-choice": {
      if (!state.personaId) return state;
      const nextStats = applyChoiceEffects(state.stats, action.choice);
      const nextRisk = addRiskScores(state.risk, action.choice.riskEffects);
      const nextProtective = addProtectiveScores(
        state.protective,
        action.choice.protectiveEffects
      );
      return {
        ...state,
        stats: nextStats,
        risk: nextRisk,
        protective: nextProtective,
        selectedChoice: action.choice,
      };
    }

    case "advance-scenario": {
      const scenario = getScenarioByIndex(state.scenarioIndex);
      const choice = state.selectedChoice;
      const entry: JourneyEntry | null = choice
        ? {
            scenarioId: scenario.id,
            title: scenario.title,
            choiceId: choice.id,
          }
        : null;

      const day = state.scenarioIndex + 1;
      const persona = state.personaId ? getPersona(state.personaId) : null;
      const todayCosts = persona
        ? persona.dailyCosts.filter((c) => c.day === day)
        : [];
      const totalAutoDeduction = todayCosts.reduce(
        (sum, c) => sum + c.amount,
        0
      );
      const nextMoney = state.stats.money - totalAutoDeduction;

      const nextIndex = state.scenarioIndex + 1;
      const isLast = nextIndex >= SCENARIOS.length;
      return {
        ...state,
        journey: entry ? [...state.journey, entry] : state.journey,
        selectedChoice: null,
        scenarioIndex: isLast ? state.scenarioIndex : nextIndex,
        screen: isLast ? "result" : "simulation",
        stats: clampStats({ ...state.stats, money: nextMoney }),
        autoExpensesApplied: todayCosts,
      };
    }

    case "restart":
      return {
        ...initialState,
        stats: clampStats({ ...PERSONAS[0].startingStats }),
        shuffleSeed: createShuffleSeed(),
      };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const persona = state.personaId ? getPersona(state.personaId) : null;
  const scenario = getScenarioByIndex(state.scenarioIndex);
  const totalScenarios = SCENARIOS.length;
  const isLastScenario = state.scenarioIndex === totalScenarios - 1;

  const progress = useMemo(() => {
    if (state.screen === "landing") return 0;
    if (state.screen === "persona") return 6;
    if (state.screen === "result") return 100;
    if (state.screen === "simulation") {
      const base = 12;
      const span = 88 - base;
      const per = span / totalScenarios;
      const completed = state.scenarioIndex;
      const partial = state.selectedChoice ? 0.4 : 0;
      return base + (completed + partial) * per;
    }
    return 0;
  }, [state.screen, state.scenarioIndex, state.selectedChoice, totalScenarios]);

  const progressLabel = useMemo(() => {
    if (state.screen === "landing") return "Modul 00 / Pembuka";
    if (state.screen === "persona") return "Modul 01 / Pilih persona";
    if (state.screen === "simulation") {
      return `Skenario ${String(state.scenarioIndex + 1).padStart(2, "0")} / ${String(
        totalScenarios
      ).padStart(2, "0")}`;
    }
    if (state.screen === "result") return "Modul 11 / Refleksi";
    return "";
  }, [state.screen, state.scenarioIndex, totalScenarios]);

  useEffect(() => {
    if (state.screen === "simulation" || state.screen === "result") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.screen, state.scenarioIndex]);

  const result = useMemo(() => {
    if (!persona) return null;
    return buildResult({
      risk: state.risk,
      protective: state.protective,
      finalStats: state.stats,
      journey: state.journey,
      targetMoney: persona.targetMoney,
    });
  }, [persona, state.risk, state.protective, state.stats, state.journey]);

  return (
    <AppShell progress={progress} progressLabel={progressLabel}>
      {state.screen === "landing" ? (
        <Landing onStart={() => dispatch({ type: "go-to-persona" })} />
      ) : null}

      {state.screen === "persona" ? (
        <PersonaSelect
          selected={state.personaId}
          onSelect={(id) => dispatch({ type: "set-persona", id })}
          onConfirm={() => dispatch({ type: "start-simulation" })}
          onBack={() => dispatch({ type: "go-to-landing" })}
        />
      ) : null}

      {state.screen === "simulation" && persona ? (
        <div className="sim-layout">
          <div>
            <div className="sim-progress">
              <div>
                <div className="sim-progress-count">
                  <strong>
                    Skenario {String(state.scenarioIndex + 1).padStart(2, "0")}
                  </strong>{" "}
                  dari {String(totalScenarios).padStart(2, "0")}
                </div>
                <h2 style={{ margin: "6px 0 0", fontSize: "1.4rem" }}>
                  {scenario.title}
                </h2>
              </div>
            </div>
            <ScenarioCard
              scenario={scenario}
              index={state.scenarioIndex}
              total={totalScenarios}
              selectedChoice={state.selectedChoice}
              shuffleSeed={state.shuffleSeed}
              onSelect={(choice) => dispatch({ type: "select-choice", choice })}
              disabled={state.selectedChoice !== null}
            />
            {state.selectedChoice ? (
              <ConsequencePanel
                choice={state.selectedChoice}
                isLast={isLastScenario}
                onNext={() => dispatch({ type: "advance-scenario" })}
                autoExpenses={state.autoExpensesApplied}
              />
            ) : null}
          </div>
          <StatDashboard persona={persona} stats={state.stats} />
        </div>
      ) : null}

      {state.screen === "result" && result ? (
        <ResultReport
          result={result}
          risk={state.risk}
          onRestart={() => dispatch({ type: "restart" })}
        />
      ) : null}
    </AppShell>
  );
}
