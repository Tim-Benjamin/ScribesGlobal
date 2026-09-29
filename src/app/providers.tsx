import type { ReactNode } from "react";
import { CursorProvider } from "../components/cursor/CursorProvider";
import CustomCursor from "../components/cursor/CustomCursor";
import SmoothScroll from "../components/motion/SmoothScroll";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CursorProvider>
      <SmoothScroll>
        <CustomCursor />
        {children}
      </SmoothScroll>
    </CursorProvider>
  );
}
