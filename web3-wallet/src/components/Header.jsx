import React from 'react';

function Header({ address, ethBalance }) {
  return (
    <div className="header">
      {address}
      {' '}
      :
      {ethBalance}
      {' '}
      ETH
    </div>
  );
}

export default Header;
