import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import closeIcon from '@iconify-icons/mdi/close';
import arrowLeftBoldOutline from '@iconify-icons/mdi/arrow-left-bold-outline';
import arrowRightBoldOutline from '@iconify-icons/mdi/arrow-right-bold-outline';
import MagnifiedView from './MagnifiedView';

const ExpandedView = ({
  selectedImageUrl,
  updateExpandedView,
  nextImageId,
  previousImageId,
  selectedImageId,
  selectedStyleId,
  updateSelectedImageId,
  photos,
  magnified,
  updateMagnified,
  magnifiedStartingCoordinates,
}) => {
  const thumbnailIcons = [];
  let keyCount = 0;
  photos.forEach((photo) => {
    if (selectedImageId !== null) {
      thumbnailIcons.push(
        <span
          key={keyCount += 1}
          onClick={() => updateSelectedImageId(photo.image_id)}
          onKeyDown={() => updateSelectedImageId(photo.image_id)}
          aria-label="expanded view thumbnail icon"
          tabIndex="0"
          role="button"
          className={photo.image_id === selectedImageId ? 'ov-thumbnail-icon-highlighted' : 'ov-thumbnail-icon'}
        />,
      );
    } else {
      thumbnailIcons.push(
        <span
          key={keyCount += 1}
          onClick={() => updateSelectedImageId(photo.image_id)}
          onKeyDown={() => updateSelectedImageId(photo.image_id)}
          aria-label="expanded view thumbnail icon"
          tabIndex="0"
          role="button"
          className={photo.style_id === selectedStyleId ? 'ov-thumbnail-icon-highlighted' : 'ov-thumbnail-icon'}
        />,
      );
    }
  });

  return (
    <div className="ov-expanded-view-container">
      <div
        className="ov-expanded-image-container"
        onClick={updateMagnified}
        onKeyDown={updateMagnified}
        tabIndex="0"
        aria-label="expanded image"
        role="button"
      >
        <img className="ov-expanded-image" src={selectedImageUrl} alt="" style={{ visibility: `${magnified ? 'hidden' : 'visible'}` }} />
        {magnified && (
          <MagnifiedView
            magnifiedStartingCoordinates={magnifiedStartingCoordinates}
            selectedImageUrl={selectedImageUrl}
          />
        )}
      </div>
      <span
        className="ov-close-expanded-view"
        onClick={updateExpandedView}
        onKeyDown={updateExpandedView}
        aria-label="close expanded view"
        tabIndex="0"
        role="button"
      >
        <Icon className="ov-close-expanded-image" icon={closeIcon} />
      </span>
      {(previousImageId !== -1 && !magnified) && (
        <span
          className="ov-expanded-view-left-arrow"
          onClick={() => updateSelectedImageId(previousImageId)}
          onKeyDown={() => updateSelectedImageId(previousImageId)}
          tabIndex="0"
          aria-label="previous image"
          role="button"
        >
          <Icon className="ov-left-arrow" icon={arrowLeftBoldOutline} />
        </span>
      )}
      {(nextImageId !== -1 && !magnified) && (
        <span
          className="ov-expanded-view-right-arrow"
          onClick={() => updateSelectedImageId(nextImageId)}
          onKeyDown={() => updateSelectedImageId(nextImageId)}
          tabIndex="0"
          aria-label="next image"
          role="button"
        >
          <Icon className="ov-right-arrow" icon={arrowRightBoldOutline} />
        </span>
      )}
      {!magnified && (
        <div
          className="ov-expanded-view-thumbnail-icon-container"
        >
          {thumbnailIcons}
        </div>
      )}
    </div>
  );
};

ExpandedView.propTypes = {
  selectedImageUrl: PropTypes.string.isRequired,
  updateExpandedView: PropTypes.func.isRequired,
  nextImageId: PropTypes.number.isRequired,
  previousImageId: PropTypes.number.isRequired,
  selectedImageId: PropTypes.number,
  updateSelectedImageId: PropTypes.func.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  magnified: PropTypes.bool.isRequired,
  updateMagnified: PropTypes.func.isRequired,
  magnifiedStartingCoordinates: PropTypes.arrayOf(PropTypes.number),
  selectedStyleId: PropTypes.number.isRequired,
};

ExpandedView.defaultProps = {
  magnifiedStartingCoordinates: [],
  selectedImageId: null,
};

export default ExpandedView;
