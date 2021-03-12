import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import chevronUp from '@iconify-icons/mdi/chevron-up';
import chevronDown from '@iconify-icons/mdi/chevron-down';
import arrowExpandAll from '@iconify-icons/mdi/arrow-expand-all';
import arrowLeftBoldOutline from '@iconify-icons/mdi/arrow-left-bold-outline';
import arrowRightBoldOutline from '@iconify-icons/mdi/arrow-right-bold-outline';
import ExpandedView from './ExpandedView';

const ImageGallery = ({
  styles,
  selectedStyle,
  selectedImageId,
  updateSelectedImageId,
  displayedThumbnailSection,
  updateDisplayedThumbnailSection,
  expandedView,
  updateExpandedView,
  magnified,
  updateMagnified,
  magnifiedStartingCoordinates,
}) => {
  const photos = [];
  let imageId = 0;
  for (let i = 0; i < styles.length; i += 1) {
    const style = styles[i];
    for (let j = 0; j < style.photos.length; j += 1) {
      if (j === 0) {
        photos.push({
          style_id: style.style_id,
          image_id: imageId += 1,
          thumbnail: style.photos[j].thumbnail_url,
          image: style.photos[j].url,
        });
      } else {
        photos.push({
          image_id: imageId += 1,
          thumbnail: style.photos[j].thumbnail_url,
          image: style.photos[j].url,
        });
      }
    }
  }
  let previousImageId = -1;
  let selectedImageUrl;
  let nextImageId = -1;

  if (selectedImageId !== null) {
    for (let i = 0; i < photos.length; i += 1) {
      const currentPhoto = photos[i];
      if (selectedImageId === currentPhoto.image_id) {
        selectedImageUrl = currentPhoto.image;
        if (i > 0) {
          const previousPhoto = photos[i - 1];
          previousImageId = previousPhoto.image_id;
        }
        if (i < photos.length - 1) {
          const nextPhoto = photos[i + 1];
          nextImageId = nextPhoto.image_id;
        }
        break;
      }
    }
  } else {
    for (let i = 0; i < photos.length; i += 1) {
      const currentPhoto = photos[i];
      if (selectedStyle.style_id === currentPhoto.style_id) {
        selectedImageUrl = currentPhoto.image;
        if (i > 0) {
          const previousPhoto = photos[i - 1];
          previousImageId = previousPhoto.image_id;
        }
        if (i < photos.length - 1) {
          const nextPhoto = photos[i + 1];
          nextImageId = nextPhoto.image_id;
        }
        break;
      }
    }
  }

  let thumbnails = [];

  let keyCount = 0;
  photos.forEach((photo) => {
    if (selectedImageId !== null) {
      thumbnails.push(
        <span
          key={keyCount += 1}
          className={selectedImageId === photo.image_id ? 'ov-thumbnail underlined' : 'ov-thumbnail'}
          onClick={() => updateSelectedImageId(photo.image_id)}
          onKeyDown={() => updateSelectedImageId(photo.image_id)}
          tabIndex="0"
          aria-label="thumbnail"
          role="button"
        >
          <img className="ov-thumbnail-image" src={photo.thumbnail} alt="" />
        </span>,
      );
    } else {
      thumbnails.push(
        <span
          key={keyCount += 1}
          className={selectedStyle.style_id === photo.style_id ? 'ov-thumbnail underlined' : 'ov-thumbnail'}
          onClick={() => updateSelectedImageId(photo.image_id)}
          onKeyDown={() => updateSelectedImageId(photo.image_id)}
          tabIndex="0"
          aria-label="thumbnail"
          role="button"
        >
          <img className="ov-thumbnail-image" src={photo.thumbnail} alt="" />
        </span>,
      );
    }
  });

  let highlightedThumbnailPosition = 0;

  if (displayedThumbnailSection === null) {
    if (selectedImageId !== null) {
      for (let i = 0; i < photos.length; i += 1) {
        const photo = photos[i];
        if (photo.image_id === selectedImageId) {
          highlightedThumbnailPosition += (i + 1);
          break;
        }
      }
    } else {
      for (let i = 0; i < photos.length; i += 1) {
        const photo = photos[i];
        if (photo.style_id === selectedStyle.style_id) {
          highlightedThumbnailPosition += (i + 1);
          break;
        }
      }
    }
  }

  let thumbnailSection;
  if (displayedThumbnailSection === null) {
    thumbnailSection = Math.floor(highlightedThumbnailPosition / 7.1);
  } else {
    thumbnailSection = displayedThumbnailSection;
  }
  const first = thumbnailSection * 7;
  const last = (thumbnailSection + 1) * 7;
  thumbnails = thumbnails.slice(first, last);
  return (
    <div className="ov-image-gallery-container">
      {expandedView && (
        <ExpandedView
          selectedImageUrl={selectedImageUrl}
          updateExpandedView={updateExpandedView}
          previousImageId={previousImageId}
          nextImageId={nextImageId}
          selectedImageId={selectedImageId}
          selectedStyleId={selectedStyle.style_id}
          updateSelectedImageId={updateSelectedImageId}
          photos={photos}
          magnified={magnified}
          updateMagnified={updateMagnified}
          magnifiedStartingCoordinates={magnifiedStartingCoordinates}
        />
      )}
      <span
        className="ov-image-gallery-large-image-container"
        onClick={updateExpandedView}
        onKeyDown={updateExpandedView}
        aria-label="open expanded view"
        tabIndex="0"
        role="button"
      >
        <img className="ov-image-gallery-large-image" src={selectedImageUrl} alt="" />
      </span>
      <div className="ov-thumbnail-container">
        <span
          className="ov-image-gallery-chevron-up"
          onClick={() => updateDisplayedThumbnailSection(thumbnailSection - 1)}
          onKeyDown={() => updateDisplayedThumbnailSection(thumbnailSection - 1)}
          tabIndex="0"
          aria-label="thumbnail"
          role="button"
          style={{ visibility: `${thumbnailSection > 0 ? 'visible' : 'hidden'}` }}
        >
          <Icon className="ov-thumbnail-arrow-up" icon={chevronUp} />
        </span>
        {thumbnails}
        <span
          className="ov-image-gallery-chevron-down"
          onClick={() => updateDisplayedThumbnailSection(thumbnailSection + 1)}
          onKeyDown={() => updateDisplayedThumbnailSection(thumbnailSection + 1)}
          tabIndex="0"
          aria-label="thumbnail"
          role="button"
          style={{ visibility: `${photos.length - (thumbnailSection + 1) * 7 > 0 ? 'visible' : 'hidden'}` }}
        >
          <Icon className="ov-thumbnail-arrow-down" icon={chevronDown} />
        </span>
      </div>
      {previousImageId !== -1 && (
        <span
          className="ov-image-gallery-left-arrow"
          onClick={() => updateSelectedImageId(previousImageId)}
          onKeyDown={() => updateSelectedImageId(previousImageId)}
          tabIndex="0"
          aria-label="previous image"
          role="button"
        >
          <Icon className="ov-arrow-left" icon={arrowLeftBoldOutline} />
        </span>
      )}
      {nextImageId !== -1 && (
        <span
          className="ov-image-gallery-right-arrow"
          onClick={() => updateSelectedImageId(nextImageId)}
          onKeyDown={() => updateSelectedImageId(nextImageId)}
          tabIndex="0"
          aria-label="next image"
          role="button"
        >
          <Icon className="ov-arrow-right" icon={arrowRightBoldOutline} />
        </span>
      )}
      <span
        className="ov-image-gallery-expand-all"
        onClick={updateExpandedView}
        onKeyDown={updateExpandedView}
        aria-label="open expanded view"
        tabIndex="0"
        role="button"
      >
        <Icon className="ov-expand-image" icon={arrowExpandAll} />
      </span>
    </div>
  );
};

ImageGallery.propTypes = {
  styles: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  updateSelectedImageId: PropTypes.func.isRequired,
  selectedImageId: PropTypes.number,
  displayedThumbnailSection: PropTypes.number,
  updateDisplayedThumbnailSection: PropTypes.func.isRequired,
  expandedView: PropTypes.bool.isRequired,
  updateExpandedView: PropTypes.func.isRequired,
  magnified: PropTypes.bool.isRequired,
  updateMagnified: PropTypes.func.isRequired,
  magnifiedStartingCoordinates: PropTypes.arrayOf(PropTypes.number),
};

ImageGallery.defaultProps = {
  selectedImageId: null,
  displayedThumbnailSection: null,
  magnifiedStartingCoordinates: [],
};

export default ImageGallery;
