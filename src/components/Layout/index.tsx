import React from 'react';
import { Outlet } from 'react-router';
import Footer from 'components/Footer';
import Nav from 'components/Nav';

import './index.scss';

function Layout() {
  return (
    <div className="App">
      <div className="bg-shapes" />
      <div className="bg-noise" />

      <div className="scroll">
        <header className="App-header">
          <div className="Logo">
            <figure />
            <h1>lambda.Digital</h1>
          </div>
          <Nav />
        </header>

        <Outlet />

        <Footer />
      </div>
    </div>
  );
}

export default Layout;
