import React from 'react';

import { canvasState, toolState } from '../../store';
import { Brush, Rect, Circle, Eraser, Line } from '../../tools';

import '../../styles/toolbar.scss';

const ToolBar = () => {

  const handleOnDrawBrush = () => {
    toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid));
  }

  const handleOnDrawRect = () => {
    toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid));
  }

  const handleOnDrawCircle = () => {
    toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionid));
  }

  const handleOnDrawEraser = () => {
    toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionid));
  }

  const handleOnDrawLine = () => {
    toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionid));
  }

  const handleColorChange = (e) => {
    const { target } = e;
    toolState.setFillColor(target.value);
    toolState.setStrokeColor(target.value);
  }

  const handleOnUndo = () => {
    canvasState.undo();
  }

  const handleOnRedo = () => {
    canvasState.redo();
  }

  const download = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = canvasState.sessionid + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div className="toolbar">
      <button className="toolbar__btn brush" onClick={handleOnDrawBrush} />
      <button className="toolbar__btn rect" onClick={handleOnDrawRect} />
      <button className="toolbar__btn circle" onClick={handleOnDrawCircle} />
      <button className="toolbar__btn eraser" onClick={handleOnDrawEraser} />
      <button className="toolbar__btn line" onClick={handleOnDrawLine} />
      <input type="color" onChange={handleColorChange} />
      <button
        className="toolbar__btn undo"
        onClick={handleOnUndo}
      />
      <button
        className="toolbar__btn redo"
        onClick={handleOnRedo}
      />
      <button className="toolbar__btn save" onClick={download} />
    </div>
  );
};

export default ToolBar;
