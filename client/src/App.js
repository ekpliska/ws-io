import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import ToolBar from './components/ToolBar';
import SettingsBar from './components/SettingsBar';
import Canvas from './components/Canvas';

import './styles/app.scss';

const App = () => {
  return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route path="/:id">
              <ToolBar />
              <SettingsBar />
              <Canvas />
            </Route>
            <Redirect to={`session${new Date().getTime()}`} />
          </Switch>
        </div>
      </BrowserRouter>
  );
};

export default App;
