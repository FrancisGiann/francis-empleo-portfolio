import { createContext } from "react";

export type ArcadeToggleSource = "direct" | "keyboard";

export interface ArcadeModeContextValue {
  enabled: boolean;
  toggle: (source?: ArcadeToggleSource) => void;
}

export const ArcadeModeContext = createContext<ArcadeModeContextValue>({
  enabled: false,
  toggle: () => {},
});
