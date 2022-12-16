import React from 'react';

import { canvasState, toolState } from '../../store';
import { Brush, Rect, Circle, Eraser, Line } from '../../tools';

import '../../styles/toolbar.scss';

const ToolBar = () => {

  const handleOnDrawBrush = () => {
    toolState.setTool(new Brush(canvasState.canvas));
  }

  const handleOnDrawRect = () => {
    toolState.setTool(new Rect(canvasState.canvas));
  }

  const handleOnDrawCircle = () => {
    toolState.setTool(new Circle(canvasState.canvas));
  }

  const handleOnDrawEraser = () => {
    toolState.setTool(new Eraser(canvasState.canvas));
  }

  const handleOnDrawLine = () => {
    toolState.setTool(new Line(canvasState.canvas));
  }

  return (
    <div className="toolbar">
      <button className="toolbar__btn brush" onClick={handleOnDrawBrush} />
      <button className="toolbar__btn rect" onClick={handleOnDrawRect} />
      <button className="toolbar__btn circle" onClick={handleOnDrawCircle} />
      <button className="toolbar__btn eraser" onClick={handleOnDrawEraser} />
      <button className="toolbar__btn line" onClick={handleOnDrawLine} />
      <input type="color" />
      <button className="toolbar__btn undo" />
      <button className="toolbar__btn redo" />
      <button className="toolbar__btn save" />
    </div>
  );
};

export default ToolBar;
