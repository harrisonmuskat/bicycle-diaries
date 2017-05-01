import React from 'react';
import { Link } from 'react-router';
import BackButton from './BackButton.js';

const Layout = (props) => {
  return(
    <div>
      <BackButton />
      <span>
        Bicycle Diaries
      </span>
      <br />
      <Link to='/'> Home </Link>
      { props.children }
    </div>
  )
}

export default Layout;
