import React from 'react';
import { NavLink } from 'react-router';

import './index.scss';

function Nav() {
  return (
    <div className="Nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Market
      </NavLink>
      <NavLink
        to="/metaverse"
        end
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Metaverse
      </NavLink>
    </div>
  );
}

export default Nav;
