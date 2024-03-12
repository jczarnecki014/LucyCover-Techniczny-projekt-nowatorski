import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

const DrawingCanvas = ({ image }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true
    });
    
    fabric.Image.fromURL(image, (img) => {
      img.scaleToWidth(canvas.width);
      canvas.setHeight(img.height * (canvas.width / img.width));
      canvas.add(img);
    });

    return () => {
      canvas.dispose();
    };
  }, [image]);

  return <canvas ref={canvasRef} />;
};

export default DrawingCanvas;