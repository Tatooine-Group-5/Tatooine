import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import chevronDown from '@iconify-icons/mdi/chevron-down';

const QuantitySelector = ({
  selectedStyle,
  selectedSize,
  selectedQuantity,
  updateSelectedQuantity,
}) => {
  const sizes = selectedStyle.skus;
  const sizeKeys = Object.keys(selectedStyle.skus);
  let totalStock = 0;
  for (let i = 0; i < sizeKeys.length; i += 1) {
    const sizeKey = sizeKeys[i];
    if (sizes[sizeKey].size === selectedSize) {
      totalStock = sizes[sizeKey].quantity;
      break;
    }
  }

  const options = [];
  let keyCount = 0;
  if (totalStock <= 15) {
    for (let i = 1; i <= totalStock; i += 1) {
      keyCount += 1;
      options.push(
        <option key={keyCount} value={i}>{i}</option>,
      );
    }
  } else {
    for (let i = 1; i <= 15; i += 1) {
      keyCount += 1;
      options.push(
        <option key={keyCount} value={i}>{i}</option>,
      );
    }
  }

  return (
    <div className="ov-quantity-selector-container">
      <select
        onChange={(e) => updateSelectedQuantity(e.target.value)}
        value={selectedQuantity || (selectedSize !== null ? '1' : 'none')}
        className="ov-quantity-selector"
      >
        {selectedSize === null && <option value="none">-</option>}
        {options}
      </select>
      <span className="ov-option-arrow-icon"><Icon className="ov-quantity-selector-open" icon={chevronDown} /></span>
    </div>
  );
};

QuantitySelector.propTypes = {
  selectedStyle: PropTypes.shape({
    style_id: PropTypes.number,
    name: PropTypes.string.isRequired,
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
    'default?': PropTypes.bool,
    photos: PropTypes.arrayOf(PropTypes.object),
    // eslint-disable-next-line react/forbid-prop-types
    skus: PropTypes.object,
  }).isRequired,
  selectedSize: PropTypes.string,
  selectedQuantity: PropTypes.string,
  updateSelectedQuantity: PropTypes.func.isRequired,
};

QuantitySelector.defaultProps = {
  selectedSize: null,
  selectedQuantity: null,
};

export default QuantitySelector;
