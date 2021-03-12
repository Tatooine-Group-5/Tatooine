import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusIcon from '@iconify-icons/mdi/plus';
import starOutline from '@iconify-icons/mdi/star-outline';
import star from '@iconify-icons/mdi/star';
import QuantitySelector from './QuantitySelector';
import SizeSelector from './SizeSelector';

const AddToCart = ({
  addToCartHandler,
  isFavorite,
  isFavoriteHandler,
  selectedStyle,
  selectedSize,
  selectedQuantity,
  updateSelectedSize,
  updateSelectedQuantity,
  updateOutOfStock,
  outOfStock,
  promptSelectSize,
  displaySelectSizeMessage,
}) => (
  <div>
    <div className="ov-cart-top-container">
      <SizeSelector
        selectedStyle={selectedStyle}
        selectedSize={selectedSize}
        updateSelectedSize={updateSelectedSize}
        updateOutOfStock={updateOutOfStock}
        outOfStock={outOfStock}
        displaySelectSizeMessage={displaySelectSizeMessage}
      />
      <QuantitySelector
        selectedStyle={selectedStyle}
        selectedSize={selectedSize}
        selectedQuantity={selectedQuantity}
        updateSelectedQuantity={updateSelectedQuantity}
      />
    </div>
    <div className="ov-cart-bottom-container">
      <div className="ov-add-to-cart-container">
        <div
          type="submit"
          tabIndex="0"
          onClick={selectedSize === null ? promptSelectSize : addToCartHandler}
          onKeyDown={selectedSize === null ? promptSelectSize : addToCartHandler}
          aria-label="Add to bag"
          role="button"
          className="ov-add-to-cart-button"
          style={{ visibility: outOfStock ? 'hidden' : 'visible' }}
        >
          ADD TO BAG
        </div>
        <span
          style={{ visibility: outOfStock ? 'hidden' : 'visible' }}
          className="ov-plus-icon"
        >
          <Icon icon={plusIcon} />
        </span>
      </div>
      <span
        className="ov-mark-as-favorite-container"
        onClick={isFavoriteHandler}
        onKeyDown={isFavoriteHandler}
        role="button"
        tabIndex="0"
        aria-label="Select as favorite"
      >
        <span className="ov-gold-star-icon">
          {isFavorite ? <Icon className="ov-gold-star" icon={star} color="gold" /> : <Icon className="ov-star-outline" icon={starOutline} /> }
        </span>
      </span>
    </div>
  </div>
);

AddToCart.propTypes = {
  addToCartHandler: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isFavoriteHandler: PropTypes.func.isRequired,
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
  updateSelectedSize: PropTypes.func.isRequired,
  updateSelectedQuantity: PropTypes.func.isRequired,
  updateOutOfStock: PropTypes.func.isRequired,
  outOfStock: PropTypes.bool.isRequired,
  promptSelectSize: PropTypes.func.isRequired,
  displaySelectSizeMessage: PropTypes.bool.isRequired,
};

AddToCart.defaultProps = {
  selectedSize: null,
  selectedQuantity: null,
};

export default AddToCart;
