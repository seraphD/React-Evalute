import React from 'react';
import logo from './logo_school.png';
import './head.css';

class Header extends React.Component{

  render(){
    return(
      <div className='top'>
      <img src={logo} alt='' className='pic' />
      </div>
      );
  }
}


export default Header;
