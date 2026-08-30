import { useContext } from "react";
import { RetroModeContext } from "@/hooks/retro-mode-context";

export function useKonami() {
  return useContext(RetroModeContext);
}

export function useRetroMode() {
  return useKonami();
}
