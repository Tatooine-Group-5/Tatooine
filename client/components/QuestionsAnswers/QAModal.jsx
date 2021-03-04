import React from 'react';
import PropTypes from 'prop-types';

const QAModal = class extends React.PureComponent {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submit = this.submit.bind(this);
  }

  closeModal() {
    const { handleCloseModal } = this.props;
    handleCloseModal();
  }

  submit() {
    const { handleSubmit } = this.props;
    handleSubmit();
    this.closeModal();
  }

  showModal() {
    const { showModal, children } = this.props;
    if (!showModal) {
      return null;
    }
    return (
      <div className="modal">
        <div className="modal-content">
          { children }
          <button
            type="submit"
            onClick={this.closeModal}
            className="modal-buttons close"
          >
            Close
          </button>
          <button
            type="button"
            onClick={this.submit}
            className="modal-buttons"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.showModal()}
      </div>
    );
  }
};

QAModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default QAModal;