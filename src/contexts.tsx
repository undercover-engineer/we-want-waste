// src/contexts.tsx
import { createContext, useContext, useRef, type RefObject } from "react";

const StepperNavRefContext = createContext<RefObject<HTMLDivElement | null> | null>(null);

export function StepperNavRefProvider({ children }: { children: React.ReactNode }) {
  const navRef = useRef<HTMLDivElement | null>(null);
  return (
    <StepperNavRefContext.Provider value={navRef}>
      {children}
    </StepperNavRefContext.Provider>
  );
}

export function useStepperNavRef(): RefObject<HTMLDivElement | null> {
  const context = useContext(StepperNavRefContext);
  if (context === null) {
    throw new Error("useStepperNavRef must be used within a StepperNavRefProvider");
  }

  return context;
}