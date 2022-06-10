import React from 'react';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';

import SettingBar from './components/SettingBar';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';

import './styles/app.scss';

const App = () => (
  <BrowserRouter>
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={(
            <>
              <Toolbar />
              <SettingBar />
              <Canvas />
            </>
          )}
        />
      </Routes>
      {/* <Navigate replace to={`f${(+new Date()).toString(16)}`} /> */}
    </div>
  </BrowserRouter>

);

export default App;
