import React from 'react';
import ToolBar from './components/ToolBar';
import SettingsBar from './components/SettingsBar';
import Canvas from './components/Canvas';

import './styles/app.scss';

const App = () => {
  return (
    <div className="app">
      <ToolBar />
      <SettingsBar />
      <Canvas />
    </div>
  );
};

export default App;
