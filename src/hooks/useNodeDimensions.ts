import { useCallback } from 'react';
import shallow from 'zustand/shallow';

import { Rect } from '../types';
import { useStore } from '../store';

function useNodeDimensions(id: string): Rect | null {
  const nodeDimensions = useStore(
    useCallback(
      (s) => {
        const nodeItem = s.nodeInternals.get(id);

        if (!nodeItem) {
          return null;
        }

        return {
          ...nodeItem.positionAbsolute,
          width: nodeItem.width ?? 0,
          height: nodeItem.height ?? 0,
        };
      },
      [id]
    ),
    shallow
  );

  return nodeDimensions;
}

export default useNodeDimensions;