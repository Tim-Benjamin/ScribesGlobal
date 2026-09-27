import type { ReactNode } from "react";
import { CursorProvider } from "../components/cursor/CursorProvider";
import CustomCursor from "../components/cursor/CustomCursor";
import { useLenis } from "../hooks/useLenis";
interface ProvidersProps {
  children: ReactNode;
}

function SmoothScrollProvider({
  children,
}: ProvidersProps) {
  useLenis();

  return <>{children}</>;
}

export function AppProviders({
  children,
}: ProvidersProps) {
  return (
    <CursorProvider>
      <SmoothScrollProvider>
        <CustomCursor />

        {children}
      </SmoothScrollProvider>
    </CursorProvider>
  );
}