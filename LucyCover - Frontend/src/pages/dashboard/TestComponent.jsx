import React, { useRef, useEffect,useState } from 'react';
import image from '../../assets/images/avatar.png'
import { fabric } from 'fabric';


const TestComponent = () => {

    const canvasRef = useRef(null);
  
    const [color, setColor] = useState('#000000');
  
    const [brushSize, setBrushSize] = useState(5);
  
  
  
    useEffect(() => {
  
      const canvas = new fabric.Canvas(canvasRef.current);
  
  
  
      // Dodaj obrazek tła
  
      fabric.Image.fromURL(image, (img) => {
  
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
  
          scaleX: canvas.width / img.width,
  
          scaleY: canvas.height / img.height
  
        });
  
      });
  
  
  
      // Włącz tryb rysowania
  
      canvas.isDrawingMode = true;
  
      canvas.freeDrawingBrush.color = color;
  
      canvas.freeDrawingBrush.width = brushSize;
  
  
  
      return () => canvas.dispose(); // Czyszczenie obiektu canvas przy odmontowaniu komponentu
  
    }, [color, brushSize]);
  
  
  
    const saveDrawing = () => {
  
      const canvas = canvasRef.current;
  
      const imgData = canvas.toDataURL({ format: 'png', multiplier: 2 }); // Zapisuje jako PNG
  
      const link = document.createElement('a');
  
      link.href = imgData;
  
      link.download = 'my_drawing.png'; // Nazwa pliku
  
      document.body.appendChild(link);
  
      link.click();
  
      document.body.removeChild(link);
  
    };
  
  
  
    const undoDrawing = () => {
  
      const canvas = canvasRef.current;
  
      const lastItem = canvas.getObjects().pop();
  
      if (lastItem) {
  
        canvas.remove(lastItem);
  
        canvas.renderAll();
  
      }
  
    };
  
  
  
    const clearDrawing = () => {
  
      const canvas = canvasRef.current;
  
      canvas.clear();
  
    };
  
  
  
    return (
  
      <div>
  
        <canvas ref={canvasRef} width={500} height={500} />
  
        <div>
  
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
  
          <input type="range" min={1} max={20} value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} />
  
          <button onClick={undoDrawing}>Cofnij</button>
  
          <button onClick={clearDrawing}>Wyczyść</button>
  
          <button onClick={saveDrawing}>Zapisz jako obraz</button>
  
        </div>
  
      </div>
  
    );
  
  };
  
  
  
  export default TestComponent;