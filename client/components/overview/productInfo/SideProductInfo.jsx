import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';

const SideProductInfo = ({
  product,
  ratings,
  selectedStyle,
}) => {
  // eslint-disable-next-line camelcase
  const { original_price, sale_price } = selectedStyle;
  const removeZerosFromPrice = (price) => {
    const slicedEnd = price.slice(-2);
    if (slicedEnd === '00') {
      return price.slice(0, -3);
    }
    return product.default_price;
  };

  const formattedOriginalPrice = removeZerosFromPrice(original_price);
  let formattedSalePrice = '';
  // eslint-disable-next-line camelcase
  if (sale_price !== null) {
    formattedSalePrice = removeZerosFromPrice(sale_price);
  }

  return (
    <div>
      {Object.keys(ratings).length > 0 && (
        <span>
          <StarRating ratings={ratings} />
          <a className="ov-link-to-reviewa" href="#headerBlock">Read all reviews</a>
        </span>
      )}
      {product.category && <p className="ov-product-category">{product.category.toUpperCase()}</p>}
      {product.name && <p className="ov-expanded-product-name">{product.name}</p>}
      <p>
        {formattedSalePrice !== '' && (
          <span className="ov-sale-price">
            $
            {formattedSalePrice}
          </span>
        )}
        $
        <span className={formattedSalePrice !== '' ? 'ov-crossed-out-original-price' : 'ov-original-price'}>{formattedOriginalPrice}</span>
      </p>

    </div>
  );
};

SideProductInfo.propTypes = {
  product: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
    default_price: PropTypes.string,
  }).isRequired,
  ratings: PropTypes.shape({
    1: PropTypes.string,
    2: PropTypes.string,
    3: PropTypes.string,
    4: PropTypes.string,
    5: PropTypes.string,
  }).isRequired,
  selectedStyle: PropTypes.shape({
    original_price: PropTypes.string,
    sale_price: PropTypes.string,
  }).isRequired,
};

export default SideProductInfo;
