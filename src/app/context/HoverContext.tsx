'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HoverContextType {
  hoveredElement: string | null;
  setHoveredElement: (id: string | null) => void;
}

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export function HoverProvider({ children }: { children: ReactNode }) {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  return (
    <HoverContext.Provider value={{ hoveredElement, setHoveredElement }}>
      {children}
    </HoverContext.Provider>
  );
}

export function useHover() {
  const context = useContext(HoverContext);
  if (context === undefined) {
    throw new Error('useHover must be used within a HoverProvider');
  }
  return context;
} 