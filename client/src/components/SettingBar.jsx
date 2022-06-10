import React from 'react';
import '../styles/toolbar.scss';
import toolState from '../store/toolState';

const SettingBar = () => (
  <div className='settings'>
    <label htmlFor='line-width'>
      Толщина линий
      <input
        id='line-width'
        type='number'
        onChange={(e) => toolState.setLineWidth(e.currentTarget.value)}
        min={1}
        max={50}
        defaultValue={1}
      />
    </label>
    <label htmlFor='stroke-color'>
      Цвет обводки
      <input
        id='stroke-color'
        type='color'
        onChange={(e) => toolState.setStrokeColor(e.currentTarget.value)}
      />
    </label>
  </div>
);

export default SettingBar;
