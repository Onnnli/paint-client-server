import React from 'react';
import '../styles/toolbar.scss';
import toolState from '../store/toolState';
import canvasState from '../store/canvasState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';

const buttons = [
  {
    name: 'brush',
    background: '../assets/image/brush.png',
    id: '1',
    callback: () => {
      toolState.setTool(
        new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId)
      );
    }
  },
  {
    name: 'rect',
    background: '../assets/image/rect.png',
    id: '2',
    callback: () => {
      toolState.setTool(
        new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId)
      );
    }
  },
  {
    name: 'circle',
    background: '../assets/image/circle.png',
    id: '3',
    callback: () => toolState.setTool(new Circle(canvasState.canvas))
  },
  {
    name: 'eraser',
    background: '../assets/image/eraser.png',
    id: '4',
    callback: () => toolState.setTool(new Eraser(canvasState.canvas))
  },
  {
    name: 'line',
    background: '../assets/image/line.png',
    id: '5',
    callback: () => toolState.setTool(new Line(canvasState.canvas))
  }
];

const options = [
  {
    name: 'undo',
    id: '6',
    callback: () => canvasState.undo()
  },
  {
    name: 'redo',
    id: '7',
    callback: () => canvasState.redo()
  }
  // {
  //   name: 'save',
  //   id: '8',
  // },
];

const Toolbar = () => {
  const changeColorHandler = (e) => {
    toolState.setFillColor(e.target.value);
    toolState.setStrokeColor(e.target.value);
  };

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${canvasState.sessionId}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='toolbar'>
      <div className='toolbar__buttons'>
        {buttons.map((el) => (
          <button
            key={el.id}
            aria-label={el.name}
            type='button'
            className={`btn ${el.name}`}
            onClick={el.callback}
          />
        ))}
        <input type='color' onChange={changeColorHandler} />
      </div>
      <div className='toolbar__options'>
        {options.map((el) => (
          <button
            key={el.id}
            aria-label={el.name}
            type='button'
            className={`btn ${el.name}`}
            onClick={el.callback}
          />
        ))}

        <button
          aria-label='save'
          type='button'
          className='btn save'
          onClick={download}
        />
      </div>
    </div>
  );
};

export default Toolbar;
