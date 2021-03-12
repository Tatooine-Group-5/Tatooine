import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import cartOutline from '@iconify-icons/mdi/cart-outline';

const Navbar = ({ cart }) => {
  let itemCount = 0;
  for (let i = 0; i < cart.length; i += 1) {
    itemCount += Number(cart[i].count);
  }

  return (
    <div className="ov-navbar-container">
      <h1 className="ov-navbar-title">Project Hackwalk</h1>
      <span className="ov-exterior-cart-container">
        <span className="ov-interior-cart-container">
          <Icon className="ov-navbar-cart" icon={cartOutline} />
          {cart.length > 0 && (
          <span className="ov-cart-item-number">
            {itemCount}
          </span>
          )}
        </span>
      </span>
    </div>
  );
};

Navbar.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object),
};

Navbar.defaultProps = {
  cart: [],
};

export default Navbar;
