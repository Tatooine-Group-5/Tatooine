import React from 'react';
import { InlineIcon } from '@iconify/react';
import check from '@iconify-icons/mdi/check';
import facebookIcon from '@iconify-icons/mdi/facebook';
import twitterIcon from '@iconify-icons/mdi/twitter';
import pinterestIcon from '@iconify-icons/mdi/pinterest';

import PropTypes from 'prop-types';

const BottomProductInfo = ({ product }) => {
  let keyCount = 0;
  const features = product.features.map((item) => {
    keyCount += 1;
    return (
      <p key={keyCount} className="ov-feature-text-container">
        <span className="ov-feature-check-icon"><InlineIcon className="ov-feature-check" key={keyCount} icon={check} width="1.5em" height="1.5em" /></span>
        <span className="ov-feature-text">{item.feature}</span>
      </p>
    );
  });
  return (
    <div className="ov-bottom-product-info-container">
      <div className="ov-bottom-product-info-left-container">
        {product.slogan && <p className="ov-slogan"><strong>{product.slogan}</strong></p>}
        {product.description && <p className="ov-description">{product.description}</p>}
      </div>
      <div className="ov-bottom-product-info-right-container">
        {features}
        <div className="ov-social-media-icon-container">
          <span className="ov-social-media-icon"><InlineIcon className="ov-facebook-icon" icon={facebookIcon} /></span>
          <span className="ov-social-media-icon"><InlineIcon className="ov-twitter-icon" icon={twitterIcon} /></span>
          <span className="ov-social-media-icon"><InlineIcon className="ov-pinterest-icon" icon={pinterestIcon} /></span>
        </div>
      </div>
    </div>
  );
};

BottomProductInfo.propTypes = {
  product: PropTypes.shape({
    slogan: PropTypes.string,
    description: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default BottomProductInfo;
