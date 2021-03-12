import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import chevronDown from '@iconify-icons/mdi/chevron-down';

const SizeSelector = ({
  selectedStyle,
  selectedSize,
  updateSelectedSize,
  updateOutOfStock,
  outOfStock,
  displaySelectSizeMessage,
}) => {
  const sizes = selectedStyle.skus;
  const sizeKeys = Object.keys(selectedStyle.skus);
  const options = [];
  let keyCount = 0;
  for (let i = 0; i < sizeKeys.length; i += 1) {
    const sizeKey = sizeKeys[i];
    if (sizes[sizeKey].quantity > 0) {
      keyCount += 1;
      options.push(
        <option
          key={keyCount}
          value={sizes[sizeKey].size}
        >
          {sizes[sizeKey].size}
        </option>,
      );
    }
  }

  if (options.length === 0 && outOfStock === false) {
    updateOutOfStock();
  }

  return (
    <span>
      {displaySelectSizeMessage && <p className="ov-display-select-size-message">Please select a size!</p>}
      <div className={displaySelectSizeMessage ? 'ov-size-selector-container select-a-size-outline' : 'ov-size-selector-container'}>
        <select
          onChange={(e) => updateSelectedSize(e.target.value)}
          value={selectedSize || (options.length === 0 ? 'out-of-stock' : 'select-size')}
          className="ov-size-selector"
          id="size-selector"
          disabled={options.length === 0}
        >
          {selectedSize === null && <option value="select-size">SELECT SIZE</option>}
          {options.length === 0 && <option value="out-of-stock">OUT OF STOCK</option>}
          {options}
        </select>
        <span className="ov-option-arrow-icon"><Icon className="ov-size-selector-open" icon={chevronDown} /></span>
      </div>
    </span>
  );
};

SizeSelector.propTypes = {
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
  updateSelectedSize: PropTypes.func.isRequired,
  updateOutOfStock: PropTypes.func.isRequired,
  outOfStock: PropTypes.bool.isRequired,
  displaySelectSizeMessage: PropTypes.bool.isRequired,
};

SizeSelector.defaultProps = {
  selectedSize: null,
};

export default SizeSelector;
