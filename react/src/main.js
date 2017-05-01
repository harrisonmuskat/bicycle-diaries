import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

$(function() {
  ReactDOM.render(
    <h1>This is my React component!</h1>,
    document.getElementById('app')
  );
});
