import React, { useRef, useEffect } from 'react';
import Scene from './Scene';

function MetaBallsCanvas(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return undefined;

    const numMetaballs = parent.clientWidth < 768 ? 50 : 100;
    const scene = new Scene(canvas, parent.clientWidth, parent.clientHeight, numMetaballs);

    const observer = new ResizeObserver(([entry]) => {
      const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
      scene.resize(width, height);
    });
    observer.observe(parent);

    return () => {
      scene.destroy();
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}

export default MetaBallsCanvas;
