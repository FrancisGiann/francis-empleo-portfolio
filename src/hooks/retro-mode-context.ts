import { createContext } from "react";

export type RetroToggleSource = "direct" | "keyboard";

export interface RetroModeContextValue {
  enabled: boolean;
  toggle: (source?: RetroToggleSource) => void;
}

export const RetroModeContext = createContext<RetroModeContextValue>({
  enabled: false,
  toggle: () => {},
});
