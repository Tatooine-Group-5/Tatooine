import React from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

import Reviews from './Reviews';
import Histograms from './Histograms';

class RandR extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ratings: null,
      page: 1,
      count: 50,
      reviews: null,
      sort: 'relevant',
      ratingFilter: [false, false, false, false, false],
    };
    this.updateSort = this.updateSort.bind(this);
    this.updateRatingFilter = this.updateRatingFilter.bind(this);
    this.clearRatingFilter = this.clearRatingFilter.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
  }

  componentDidMount() {
    this.updateMetaData();
    this.updateReviews();
  }

  updateRatingFilter(e) {
    const { ratingFilter } = this.state;
    const temp = [...ratingFilter];
    temp[e] === true ? temp[e] = false : temp[e] = true;
    this.setState({ ratingFilter: temp });
  }

  clearRatingFilter() {
    const temp = [false, false, false, false, false];
    this.setState({ ratingFilter: temp });
  }

  updateSort(selected) {
    this.setState({ sort: selected }, () => { this.updateReviews(); });
  }

  updateMetaData() {
    const { productId } = this.props;
    axios.get(`metadata/${productId}`)
      .then((r) => {
        this.setState({
          ratings: r.data,
        });
      });
  }

  updateReviews() {
    // get reviews
    const {
      page, count, sort,
    } = this.state;
    const { productId } = this.props;

    const params = {
      page,
      count,
      sort,
      productId,
    };

    axios.get('/reviews', { params })
      .then((r) => {
        this.setState({
          reviews: r.data,
        });
      });
  }

  render() {
    const {
      reviews, ratings, sort, ratingFilter, parentRatings,
    } = this.state;
    const { pName, productId } = this.props;
    const { updateReviews } = this;
    let voteCount = 0;
    if (ratings) {
      for (const key in ratings.ratings) {
        voteCount += Number(ratings.ratings[key]);
      }
    }
    return (
      <div className="r-box">
        <div className="headerBlock" id="headerBlock">RATINGS & REVIEWS</div>
        <div className="histogramBlock">
          {ratings ? (
            <Histograms
              ratings={ratings}
              updateRF={this.updateRatingFilter}
              ratingFilter={ratingFilter}
              clearRatingFilter={this.clearRatingFilter}
            />
          ) : null}
        </div>
        <div className="reviewBlock">
          {reviews && ratings ? (
            <Reviews
              reviews={reviews}
              sort={sort}
              ratings={voteCount}
              updateSort={this.updateSort}
              ratingFilter={ratingFilter}
              pName={pName}
              product_id={productId}
              parentRatings={ratings}
              updateReviews={updateReviews}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

// RandR.propTypes = {
//   productId: PropTypes.number.isRequired,
// };

export default RandR;
