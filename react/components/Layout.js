import React from 'react';
import { Link } from 'react-router';
import BackButton from './BackButton.js';

const Layout = (props) => {
  return(
    <div className="row">
      { props.children }
    </div>
  )
}

export default Layout;
