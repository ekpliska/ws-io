import React from 'react';

import { toolState } from '../../store';

import '../../styles/toolbar.scss';

const inputIds = ['line-width', 'stroke-color'];
const SettingsBar = () => {

  const handleChange = (e) => {
    const { target } = e;
    if (target.id === inputIds[0]) {
      toolState.setLineWidth(target.value);
    }
    if (target.id === inputIds[1]) {
      toolState.setStrokeColor(target.value);
    }
  }

  return (
    <div className="settings-bar">
      <div className="settings-bar__input">
        <label htmlFor={inputIds[0]}>Line weight: </label>
        <input
          id={inputIds[0]}
          type="number"
          defaultValue={1}
          min={1}
          max={10}
          onChange={handleChange}
        />
      </div>
      <div className="settings-bar__input">
        <label htmlFor={inputIds[1]}>Stroke color: </label>
        <input
          id={inputIds[1]}
          type="color"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SettingsBar;
