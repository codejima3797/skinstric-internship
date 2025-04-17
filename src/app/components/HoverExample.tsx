'use client';

import { useHover } from '../context/HoverContext';

export function TriggerComponent() {
  const { setHoveredElement } = useHover();

  return (
    <div
      onMouseEnter={() => setHoveredElement('example-element')}
      onMouseLeave={() => setHoveredElement(null)}
      className="p-4 bg-blue-500 text-white rounded cursor-pointer"
    >
      Hover over me!
    </div>
  );
}

export function AffectedComponent() {
  const { hoveredElement } = useHover();

  return (
    <div
      className={`p-4 bg-green-500 text-white rounded transition-transform duration-300 ${
        hoveredElement === 'example-element' ? 'translate-x-4' : ''
      }`}
    >
      I move when you hover the other component!
    </div>
  );
} 