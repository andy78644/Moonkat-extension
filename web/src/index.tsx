import React from 'react';
import ReactDOM from 'react-dom';

// @ts-ignore
import Main from './components/Main.tsx';

window.onload = function () {
  ReactDOM.render(<Main />, document.getElementById('root'));
};
