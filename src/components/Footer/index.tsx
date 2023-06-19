import React from 'react';
import './style.scss';

function Item() {
  return (
    <footer className="App-footer">
      <div className="subfooter">
        <div className="Logo">
          <figure />
          <h3>lambda.Digital</h3>
        </div>

        <div className="footer-text">
          <p className="description">
            The best digital marketplace for crypto collectibles and
            non-fungible tokens (NFTs). Buy, sell, and discover exclusive
            digital items.
          </p>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Terms of Service</a>
          &nbsp;&nbsp;
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Privacy Policy</a>
          <p>2023 &copy; All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Item;
