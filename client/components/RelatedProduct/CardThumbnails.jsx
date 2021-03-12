import React from 'react';
import PropTypes from 'prop-types';
import { InlineIcon } from '@iconify/react';
import Star from '@iconify-icons/fluent/star-20-regular';

const CardThumbnails = class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      thumbnailImageIndex: 1,
    };
    this.mountThumbnailImages = this.mountThumbnailImages.bind(this);
    this.handleThumbnailImage = this.handleThumbnailImage.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleThumbnailImage(index) {
    const { thumbnailImageIndex } = this.state;
    const { thumbnailUrl } = this.props;
    let newIndex = thumbnailImageIndex + index;
    if (newIndex > thumbnailUrl.length) {
      newIndex = 1;
    }
    if (newIndex < 1) {
      newIndex = thumbnailUrl.length;
    }
    this.setState({
      thumbnailImageIndex: newIndex,
    });
  }

  handleOpenModal() {
    const { openModal } = this.props;
    openModal();
  }

  mountThumbnailImages() {
    const { thumbnailUrl } = this.props;
    const { thumbnailImageIndex } = this.state;
    let index = 0;
    return thumbnailUrl.map((singleUrl) => {
      index += 1;
      return (
        <img
          key={singleUrl}
          className={`rp-product-thumbnail ${thumbnailImageIndex === index ? '' : 'no-display'}`}
          src={singleUrl}
          alt="imageRelatedProduct1"
        />
      );
    });
  }

  render() {
    const { thumbnailUrl } = this.props;
    return (
      <div className="rp-image-box">
        <InlineIcon
          className="rp-starred pointer"
          icon={Star}
          role="button"
          onClick={this.handleOpenModal}
        />
        {this.mountThumbnailImages()}
        <button
          className={`rp-button-left ${thumbnailUrl.length > 1 ? '' : 'no-display'}`}
          onClick={() => this.handleThumbnailImage(-1)}
          type="button"
        >
          &#10094;
        </button>
        <button
          className={`rp-button-right ${thumbnailUrl.length > 1 ? '' : 'no-display'}`}
          onClick={() => this.handleThumbnailImage(1)}
          type="button"
        >
          &#10094;
        </button>
      </div>
    );
  }
};

CardThumbnails.propTypes = {
  thumbnailUrl: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default CardThumbnails;
